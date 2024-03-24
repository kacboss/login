<?php

if (!class_exists('Timber')) {
  add_action('admin_notices', function () {
    echo '<div class="error"><p>Timber not activated</p></div>';
  });

  return '<p>Timber not activated</p>';
}

if (!class_exists('ACF')) {
  add_action('admin_notices', function () {
    echo '<div class="error"><p>ACF not activated</p></div>';
  });

  return '<p>ACF not activated</p>';
}

// DEFINITIONS
define('THEME_DOMAIN', wp_get_theme()['TextDomain']);
define('THEME_VERSION', wp_get_theme()['Version']);
define('PER_PAGE', get_option('posts_per_page'));

require_once __DIR__ . '/includes/autoload.php';

Timber::$dirname = ['views'];

Ajax::init();
Mail::$templatesLocation = [__DIR__, __DIR__ . '/views/email'];

class StarterSite extends TimberSite
{
  public function __construct()
  {
    add_theme_support('post-formats', []);
    add_theme_support('post-thumbnails');
    add_theme_support('menus');


    $this->menus = [
      'main_menu' 	    => __( 'Main Menu', THEME_DOMAIN ),
      'footer_menu' 	=> __( 'Footer Menu', THEME_DOMAIN ),
      'footer_menu_2' 	=> __( 'Footer Menu 2', THEME_DOMAIN ),
      'footer_menu_3' 	=> __( 'Footer Menu 3', THEME_DOMAIN ),
    ];

    register_nav_menus($this->menus);


    add_theme_support('html5', ['comment-list', 'comment-form', 'search-form', 'gallery', 'caption']);
//     add_theme_support('woocommerce');

    add_filter('timber_context', [$this, 'addToContext']);
    add_filter('get_twig', [TwigFilters::class, 'register']);

    add_action('init', [Posts::class, 'register']);
    add_action('init', [Taxonomies::class, 'register']);


    $this->optionsPage();
 
    $this->options = AcfAdds::getOptions();

    new Base();
    new Assets();

    parent::__construct();
  }

  private function optionsPage()
  {
    if (function_exists('acf_add_options_page')) {
      acf_add_options_page(['page_title' => 'Page settings']);
    }
  }



  public function addToContext($context)
  {
    foreach ( $this->menus as $key => $value ) {
      if ( has_nav_menu( $key ) ) {
      $context[$key] = new TimberMenu($key);
      }
    }
    $context['theme']->version = THEME_VERSION;;

    $context['site'] = $this;
    $context['options'] = $this->options;

    return $context;
  }
}

new StarterSite();


add_action( 'init', 'my_custom_post_type_rest_support', 25 );
function my_custom_post_type_rest_support() {
  global $wp_post_types;

  $post_type_name = 'distributor';
  if( isset( $wp_post_types[ $post_type_name ] ) ) {
    $wp_post_types[$post_type_name]->show_in_rest = true;
    $wp_post_types[$post_type_name]->rest_base = $post_type_name;
    $wp_post_types[$post_type_name]->rest_controller_class = 'WP_REST_Posts_Controller';
  }
}

function register_distributor_custom_fields() {
  
  register_rest_field('distributor', 'longitude', [
      'get_callback' => 'get_distributor_custom_field',
      'update_callback' => null,
      'schema' => null,
  ]);

  register_rest_field('distributor', 'latitude', [
      'get_callback' => 'get_distributor_custom_field',
      'update_callback' => null,
      'schema' => null,
  ]);
}

add_action('rest_api_init', 'register_distributor_custom_fields');

function get_distributor_custom_field($object, $field_name, $request) {
  return get_post_meta($object['id'], $field_name, true);
}