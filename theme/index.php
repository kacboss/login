<?php

$context = Timber::get_context();
$context['posts'] = new Timber\PostQuery();

Timber::render('home.twig', $context);
