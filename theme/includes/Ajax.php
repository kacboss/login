<?php

class Ajax
{
    public static function init()
    {
        $ajaxEvents = [
            'ajax_contact' => [ false, 'ajaxContact' ],
        ];

        foreach ($ajaxEvents as $key => list($priv, $name)) {
            $name = $name ? $name : $key;
            self::addAction($key, [__CLASS__, $name]);
        }
    }

    static function addAction($name, $function, $private = false)
    {
        add_action('wp_ajax_' . $name, $function);
        !$private && add_action('wp_ajax_nopriv_' . $name, $function);
    }


    public static function ajaxContact()
    {
        $utility          = isset($_POST['utility']) ? $_POST['utility'] : [];
        $commercial       = isset($_POST['commercial-industrial']) ? $_POST['commercial-industrial'] : [];
        $residential      = isset($_POST['residential']) ? $_POST['residential'] : [];
    
        $name             = isset($_POST['first-name']) ? $_POST['first-name'] : '';
        $lastname         = isset($_POST['last-name']) ? $_POST['last-name'] : '';
        $email            = isset($_POST['email']) ? $_POST['email'] : '';
        $company          = isset($_POST['company-name']) ? $_POST['company-name'] : '';
        $country          = isset($_POST['country']) ? $_POST['country'] : '';
        $activity         = isset($_POST['activity']) ? $_POST['activity'] : '';
    
        $title = 'Contact form - Rooftop Portfolio';
    
        if ($email) {
            $msg    = __("Thank you, your message has been sent", THEME_DOMAIN);
            $to      = 'kacper.raksimowicz@gmail.com';
            $headers = array('From: kr <kacper.raksimowicz@gmail.com>', 'Content-Type: text/html; charset=UTF-8');
            $subject = $title;
    
            $message = "Email: " . $email . "<br>" .
                       "Name: " . $name . " " . $lastname . "<br>" .
                       "Company: " . $company . "<br>" .
                       "Country: " . $country . "<br>" .
                       "Activity: " . $activity . "<br>" .
                       "Segments:<br>" .
                       "Utility: " . (is_array($utility) ? implode(", ", $utility) : $utility) . "<br>" .
                       "Commercial/Industrial: " . (is_array($commercial) ? implode(", ", $commercial) : $commercial) . "<br>" .
                       "Residential: " . (is_array($residential) ? implode(", ", $residential) : $residential);
    
            wp_mail($to, $subject, $message, $headers);
        }
    
        echo json_encode([
            'msg' => $msg
        ]);
    
        exit;
    }



    public static function actionName()
    {
        echo json_encode(['result' => 'result']);
        exit;
    }
}




