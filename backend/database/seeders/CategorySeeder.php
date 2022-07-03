<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \DB::table('categories')->insert([
            [
                'category_name' => 'Food',
            ],
            [
                'category_name' => 'Travel',
            ],
            [
                'category_name' => 'Health & Fitness',
            ],
            [
                'category_name' => 'Photography',
            ],
            [
                'category_name' => 'Personal',
            ],
            [
                'category_name' => 'Sports',
            ],
            [
                'category_name' => 'News',
            ],
            [
                'category_name' => 'Political',
            ],
        ]);
    }
}
