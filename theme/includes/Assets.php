<?php

/*
 * Append styles and scripts to site
 */

class Assets
{
    public function __construct()
    {
        add_action('wp_enqueue_scripts', [$this, 'registerStyles']);
        add_action('wp_enqueue_scripts', [$this, 'registerScripts']);
    }

    public function registerStyles()
    {
        wp_enqueue_style('theme-main', get_stylesheet_directory_uri() . '/styles/main.css', false);
        wp_enqueue_style('theme-fonts', 'https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700&display=swap', false);

    }

    public function registerScripts()
    {
        wp_enqueue_script('polyfill',
            '//polyfill.io/v3/polyfill.min.js?flags=gated&amp;features=default,Object.entries,Object.values,Array.prototype.includes,Symbol.iterator,Array.prototype.@@iterator,NodeList.prototype.@@iterator,NodeList.prototype.forEach,Array.prototype.find,Array.prototype.forEach,Array.prototype.findIndex,Symbol,Array.from,URL',
            false, null, true);

        wp_enqueue_script('theme-vendor2', get_stylesheet_directory_uri() . '/scripts/vendor.js', false, THEME_VERSION, true);
        wp_enqueue_script('theme-main', get_stylesheet_directory_uri() . '/scripts/main.js', ['theme-vendor2'], THEME_VERSION, true);

        wp_localize_script('theme-main', 'wp', [
            'ajax' => admin_url('admin-ajax.php'),
        ], 'before');
    }
}
