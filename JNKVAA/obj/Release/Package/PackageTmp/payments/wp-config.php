<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the web site, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * Localized language
 * * ABSPATH
 *
 * @link https://wordpress.org/support/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'wp_gaz74' );

/** Database username */
define( 'DB_USER', 'wp_gqhek' );

/** Database password */
define( 'DB_PASSWORD', '_2Kn$#_FMPvc3W5t' );

/** Database hostname */
define( 'DB_HOST', 'localhost:3306' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8' );

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
define('AUTH_KEY', 'a4@KW&)P~[Hv(wS5~9)]]v2d~:Z-kxH!4L051:1yM@80l39c*-X7#G*OXrpbKB85');
define('SECURE_AUTH_KEY', 'DDLN3J84P28fOw#7/92GEiC*f55A1uW56C*D]y6X1KKt(!W/Six~Ih33T3c*Q728');
define('LOGGED_IN_KEY', '/3)bp;LsgA@0h%9n/X!0/4E80/po79];p4!0[B04I2IpC~ELq1:@/gD~35:)Eg:-');
define('NONCE_KEY', '2mAoa[C&;o&6G82rQ24@M)~98:+s[5@piAeRv+GFv)-HBTB42MSP|#%Nth&m52hg');
define('AUTH_SALT', '9;-!BC)|1T-qq/Vi@5BD;quJ&--UPPMgTA6UJ5x:@4lk8wz-sT#vr-O5EgkILdib');
define('SECURE_AUTH_SALT', '87%et;Y280;/9597&gGR)2I1&S#06(59w3i62W30UtMQV88(o6|7%]niNK%V+1lh');
define('LOGGED_IN_SALT', '71b9C6-ER&&(8I2nRb]I/N8[&ENs%&Y7dYU2j86ATev47t5nc|]H)|:i)~oy!-75');
define('NONCE_SALT', '79u8r06kO9!9342-Lo#Y5;5VozkbYM3#pt2z_OCHwv30IM047F)1xE1zdXB5z995');


/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'r06izzvq_';


/* Add any custom values between this line and the "stop editing" line. */

define('WP_ALLOW_MULTISITE', true);
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
if ( ! defined( 'WP_DEBUG' ) ) {
	define( 'WP_DEBUG', false );
}

/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
