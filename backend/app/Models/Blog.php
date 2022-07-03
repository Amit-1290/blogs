<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Blog extends Model
{
    protected $fillable = ['title', 'description'];

    /**
     * Get all of the categories for the Blog
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function blogCategories()
    {
        return $this->hasMany('App\Models\BlogCategory', 'blog_id', 'id')
                    ->leftJoin('categories','categories.id','blog_categories.category_id')
                    ->selectRaw('blog_categories.id,blog_categories.category_id,blog_categories.blog_id,categories.category_name');
    }

    /**
     * Common Query
     */
    public static function commonQuery()
    {
        return Blog::selectRaw('id,slug,title,description,DATE_FORMAT(created_at,"%d %M %y %h:%i %p") as createdAt')
              ->with('blogCategories');
    }
}
