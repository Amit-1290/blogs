<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Blog;
use App\Models\BlogCategory;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

use Carbon\Carbon;

class BlogController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $user =  Auth::guard('api')->user();

        $userBlogs =  Blog::commonQuery()
               ->where('user_id',$user->id)
               ->orderBy('created_at','desc')
               ->when($request->has('dateRange'), function ($query) use ($request) {
                    $startDate = Carbon::parse($request->dateRange[0])->format('Y-m-d');
                    $endDate = Carbon::parse($request->dateRange[1])->format('Y-m-d');
                    $query->whereDate('created_at', '>=', $startDate)
                    ->whereDate('created_at', '<=', $endDate);
                })
                ->paginate($this->perPage)
                ->toArray();


        return $this->toJson(['userBlogs' => $userBlogs['data'] , 'hasMore' => $userBlogs['next_page_url'] ? 1 : 0 ] ,'Blog get successfully',1);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function storeOrUpdate(Request $request)
    {
        $this->validate($request, [
            'title' => 'required',
            'description' => 'required',
            'blogCategories' => 'required|array',
        ]);

        $user =  Auth::guard('api')->user();

        $blog =  Blog::find($request->id);

        if(empty($blog))
        {
            $blog = new Blog();
        }

        $blog->fill($request->all());
        $blog->user_id = $user->id;
        $blog->slug = \Str::slug($request->title).'-'.rand(5,10000);
        $blog->save();


        if($blog)
        {
            BlogCategory::where('blog_id',$blog->id)->delete();
            foreach($request->blogCategories as $categoryId)
            {
                $blogCateogry = new BlogCategory();
                $blogCateogry->category_id = $categoryId;
                $blogCateogry->blog_id = $blog->id;
                $blogCateogry->save();
            }
        }

        return $this->toJson([],$request->id ? 'Blog updated successfully' : 'Blog added successfully',1);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Blog  $blog
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request)
    {

        $this->validate($request, [
            'slug' => 'required|exists:blogs,slug',
        ]);

        $blogInfo = Blog::commonQuery()->where('slug',$request->slug)->first();

        if(!empty($blogInfo))
        {
            return $this->toJson(['blogInfo' => $blogInfo ] ,'Get blog detail success',1);
        }
        return $this->toJson([],'Get blog detail error',0);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Blog  $blog
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        $this->validate($request, [
            'id' => 'required|exists:blogs,id',
        ]);

        Blog::destroy($request->id);
        BlogCategory::where('blog_id',$request->id)->delete();

        return $this->toJson([],'Blog has been deleted successfully',1);
    }

    /**
     * Get Category
     *
     * @param
     * @return \Illuminate\Http\Response
     */
    public function getAllCategories()
    {
        $categories=  Category::selectRaw("id,id as category_id,category_name")->get();

        return $this->toJson(['categories' => $categories],'Get categories success',1);
    }
}
