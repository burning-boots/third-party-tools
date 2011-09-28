<?php
/**
 * CSS Compressor 3.0 - Test Suite
 * January 03, 2011
 * Corey Hart @ http://www.codenothing.com
 */
require( dirname( __FILE__ ) . '/../../src/CSSCompression.php' );
require( dirname( __FILE__ ) . '/Color.php' );


Class FileTest
{

	/**
	 * Test Patterns
	 *
	 * @param (CSSCompression instance) instance: Instance of CSSCompression class
	 * @param (bool) passed: Boolean check of compression matching expected result
	 * @param (string) file: Filename to test (resides in unit/sheets)
	 * @param (string) mode: What mode you want the compressor in
	 * @param (array) options: Any extra set of options needed
	 * @param (string) root: Path to unit directory
	 * @param (string) original: Path to original test sheets
	 * @param (string) expected: Path to expected test sheets
	 * @param (string) result: Path to compression result
	 */
	private $instance;
	private $passed = false;
	private $file = '';
	private $mode = '';
	private $options = array();
	private $root = '';
	private $original = '';
	private $expected = '';
	private $result = '';


	/**
	 * Auto-running script, run everything from the constructor
	 *
	 * @param (array) args: Test arguments
	 */
	public function __construct( $args = array() ) {
		$this->arguments( $args );
		$this->setup();
		$this->clean( $this->root . 'errors/' );
		$this->run();
		$this->output();
	}

	/**
	 * Marges arguments into this instance
	 *
	 * @param (array) args: Array of arguments passed into the constructor
	 */
	private function arguments( $args = array() ) {
		$this->file = isset( $args['file'] ) ? $args['file'] : '';
		$this->mode = isset( $args['mode'] ) ? $args['mode'] : '';
		$this->options = isset( $args['options'] ) ? $args['options'] : '';
	}

	/**
	 * Initializes the compression instance and sets modes/options
	 *
	 * @params none
	 */
	private function setup(){
		$this->instance = new CSSCompression();
		$this->root = realpath( dirname( __FILE__ ) . '/../' ) . '/';
		$this->original = $this->root . 'sheets/original/' . $this->file;
		$this->expected = $this->root . 'sheets/expected/' . $this->file;
		$this->result = $this->root . 'errors/' . $this->file;

		// Set mode if availiable
		if ( $this->mode ) {
			$this->instance->mode( $this->mode );
		}

		// Set custom options if needed
		if ( $this->options ) {
			$this->instance->option( $this->options );
		}
	}

	/**
	 * Removes all files in a directory (NOT RECURSIVE)
	 *
	 * @param (string) dir: Full directory path
	 */
	private function clean( $dir ) {
		if ( ! is_dir( $dir ) ) {
			return mkdir( $dir );
		}

		$handle = opendir( $dir );
		while ( ( $file = readdir( $handle ) ) !== false ) {
			if ( $file != '.' && $file != '..' && strpos( $file, 'README' ) === false ) {
				unlink( $dir . $file );
			}
		}
	}

	/**
	 * Gets the contents of the test file (original & expected), and stores the compression result
	 *
	 * @params none
	 */
	private function run(){
		$original = trim( file_get_contents( $this->original ) );
		$expected = trim( file_get_contents( $this->expected ) );
		$result = $this->instance->compress( $original );
		$this->passed = ( $expected === $result );

		// Store compression data
		file_put_contents( $this->result, $result );
	}

	/**
	 * Prints out meta data about the test, and the final result
	 *
	 * @params none
	 */
	private function output(){
		// Print out meta data
		echo Color::blue( 'File: ' ) . $this->file . "\n";
		echo Color::blue( 'Mode: ' ) . $this->mode . "\n";
		echo Color::blue( 'Options: ' ) . print_r( $this->options, true ) . "\n";
		echo Color::gray( '---------------------------------------' ) . "\n";
		echo Color::blue( 'Original to Expected diff: ' ) . "\ndiff " . $this->original . ' ' . $this->expected . "\n";
		echo Color::gray( '---------------------------------------' ) . "\n";
		echo Color::blue( 'Expected to Actual diff: ' ) . "\ndiff " . $this->expected . ' ' . $this->result . "\n";
		echo "\n\n";

		if ( $this->passed ) {
			echo Color::boldgreen( "File Test Passed" ) . "\n\n";
			exit( 0 );
		}
		else {
			echo Color::boldred( "File Test Failed" ) . "\n\n";
			exit( 1 );
		}
	}
};

?>
