<?php
define( 'WP_CACHE', true );
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the web site, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://wordpress.org/support/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'u828172228_thrifterspoint' );

/** MySQL database username */
define( 'DB_USER', 'u828172228_admin' );

/** MySQL database password */
define( 'DB_PASSWORD', 'Hashi@135' );

/** MySQL hostname */
define( 'DB_HOST', 'localhost' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         'O!HX+V]+Hr)T2|r1V9RkPsYgj3#IWttjj[}^L9!qz+65%[F7O2# etcX|kU_a|_d' );
define( 'SECURE_AUTH_KEY',  'dFWf C1{8!>>lP)9&@SSn;u7Z1:e.o]Q1o|56$D1JY8SvEe6Er`N;bhwQQ^30$ho' );
define( 'LOGGED_IN_KEY',    'Q/7Z9*<E^=pC|tx;:2qA/xYAU[ 3LmNWK4i_bDQ_MAQwvb+0krA*]dpZ.xa[htA,' );
define( 'NONCE_KEY',        '[,;$>b6W=$u<C0p~3cfI6(j`O7/!O4,$={lOcw#+=M|sI:vaBu8a8:]^5PU4x!st' );
define( 'AUTH_SALT',        'gN6VR}izG5GE3FL );([|_*9xJ]/QQh#;65L{c~:MgZFZsnPK_N9B=/k7(]%3tC~' );
define( 'SECURE_AUTH_SALT', '*C.BG3]+P.&H.~ XrYP&NLk<1sJN@^cJQji}jMB4sD6;.N@(_G}+F=b?6^f9Ar|]' );
define( 'LOGGED_IN_SALT',   ']i(IL1.Z]>YD@r}!RYDbLXcK:*)~f_9U}72`hQ6IncmdMH(SDof tyv~{w]#z!Gp' );
define( 'NONCE_SALT',       'MhO,#<*$@|x)w%rPL/Vo@zyiRP+Q5Ur3)zJx>s$>wTd8A0}D!!/px&BImRCGxOSL' );

/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/support/article/debugging-in-wordpress/
 */
define( 'WP_DEBUG', false );

/* Add any custom values between this line and the "stop editing" line. */



/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
