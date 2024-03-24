<?php


class Posts
{
    public static $slugs = [
        'new-post' => "post/new"
    ];

    public static function getSlug($postType, $lang = null)
    {

        if (!empty(self::$slugs) && isset(self::$slugs[$postType])) {
            return self::$slugs[$postType];
        }

        return $postType;
    }

    public static function register()
    {
        register_post_type('distributor', [
            'labels' => [
                'name' => __('Distributors', THEME_DOMAIN),
                'singular_name' => __('New Distributor', THEME_DOMAIN),
                'add_new' => __('Add Distributor', THEME_DOMAIN),
                'add_new_item' => __('Add new Distributor', THEME_DOMAIN),
                'edit_item' => __('Edit Distributor', THEME_DOMAIN),
                'new_item' => __('New Distributor', THEME_DOMAIN),
                'all_items' => __('All Distributors', THEME_DOMAIN),
                'view_item' => __('Show Distributor', THEME_DOMAIN),
                'search_items' => __('Search Distributors', THEME_DOMAIN),
                'not_found' => __('Not found', THEME_DOMAIN),
                'not_found_in_trash' => __('Not found in trash', THEME_DOMAIN)
            ],
            'public' => true,
            'publicly_queryable' => true,
            'show_ui' => true,
            'show_in_menu' => true,
            'query_var' => true,
            'rewrite' => [
                'slug' => self::getSlug('distributor')
            ],
            'capability_type' => 'post',
            'has_archive' => false,
            'hierarchical' => false,
            'menu_position' => null,
            'menu_icon' => 'dashicons-format-gallery',
            'supports' => ['title', 'thumbnail', 'page-attributes']
        ]);
    }
}