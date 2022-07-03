<?php

namespace App\Http\Controllers\Api;

use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;

use App\Models\User;

class AuthController extends Controller
{

    /*
     |--------------------------------------------------------------------------
     | Auth Controller
     |--------------------------------------------------------------------------
     |
     | This controller handles login, registration and forgot password features.
    */

    /**
     * Login user in our system.
     *
     * @param Request $request
     *
     * @return json
     */
    public function getUserDetail(Request $request)
    {
        $user = \Auth::user();
        $userDetail = ApiHelper::getUserById($user->id)->first();
        return $this->toJson([
            'userDetail' => $userDetail,
        ],'Get user successfully', 1);
    }

    /**
     * Login user in our system.
     *
     * @param object $request
     *
     * @return json
     */
    public function login(Request $request)
    {
        $this->validate($request, [
            'email' => 'required|email|exists:users,email',
            'password' => 'required|min:8|max:16',
        ]);

        $userDetail = User::where('email', $request->email)->first();

        if (\Hash::check($request->password, $userDetail->password)) {
            $user = \Auth::loginUsingId($userDetail->id);
            $tokenResult = $user->createToken('Blog')->accessToken;
            return $this->toJson([
                'userDetail' => $userDetail,
                'accessToken' => $tokenResult
            ],'Login successfully', 1);
        }

        return $this->toJson(null,'Email and password are wrong', 0);
    }


    /**
     * Register user.
     *
     * @param Request $request
     *
     * @return json
     */
    public function signUp(Request $request)
    {

        $this->validate($request, [
            'email' => 'required',
            'password' => 'required|max:16|min:8',
        ]);

        $userData = User::where('email', $request->email)->first();

        if (!empty($userData)) {
            return $this->toJson(null, trans('api.register.' . $request->type . '_already_exist'), 0);
        }

        $user = new User();
        $user->fill($request->all());
        $user->password = bcrypt($request->password);

        if ($user->save()) {
            return $this->toJson(NULL,'Register successfully',1);
        }
    }


    /**
     * Logout user
     *
     */
    public function logout()
    {
        $user = Auth::guard('api')->user();

        $userToken = Auth::user()->token();

        if (empty($user)) {
            return $this->toJson(null,'User not found', 0);
        }

        $userToken->revoke();

        \Session::flush();
        return $this->toJson(null,'Logout successfully',1);
    }

    /**
     * Change Password
     *
     * @param Request $request
     *
     * @return Response Json
     *
     */
    public function changePassword(Request $request)
    {
        $this->validate($request, [
            'oldPassword' => 'required|min:8|max:16',
            'newPassword' => 'required|min:8|max:16',
            'confirmPassword' => 'required|same:newPassword'
        ]);

        $user = Auth::guard('api')->user();

        if (empty($user)) {
            return $this->toJson(null, trans('api.auth.user_not_found'), 0);
        }

        if (\Hash::check($request->oldPassword, $user->password)) {
            if ($request->newPassword != $user->showPassword) {
                $user->password = bcrypt($request->newPassword);
                $user->showPassword = $request->newPassword;
                $user->save();
                return $this->toJson(null, trans('api.auth.change_password'), 1);
            }

            return $this->toJson(null, trans('api.auth.current_same_new'), 0);
        }

        return $this->toJson(null, trans('api.auth.invalid_current_password'), 0);
    }
}
