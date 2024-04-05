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
        $name           = isset($_POST['name']) ? $_POST['name'] : [];
        $surname        = isset($_POST['surname ']) ? $_POST['surname '] : [];
        $company        = isset($_POST['company']) ? $_POST['company'] : [];
    
        $employees              = isset($_POST['employees']) ? $_POST['employees'] : '';
        $email                  = isset($_POST['email']) ? $_POST['email'] : '';
        $phone                  = isset($_POST['phone']) ? $_POST['phone'] : '';
        $needs                  = isset($_POST['needs']) ? $_POST['needs'] : '';
        $hear                   = isset($_POST['hear']) ? $_POST['hear'] : '';
    
        $title = 'Contact form - Rooftop Portfolio';
    
        if ($email) {
            $msg    = __("Thank you, your message has been sent", THEME_DOMAIN);
            $to      = 'kacper.raksimowicz@gmail.com';
            $headers = array('From: kr <kacper.raksimowicz@gmail.com>', 'Content-Type: text/html; charset=UTF-8');
            $subject = $title;
    
            $message = "Email: " . $email . "<br>" .
                       "Name: " . $name . " " . $surname . "<br>" .
                       "Company: " . $company . "<br>" .
    
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




