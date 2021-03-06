/**********
 * Resource Management Functions
 * Author: Ian Glen <ian@ianglen.me>
 *********/

/**
 * graphics
 */
var building;		// image for building entity
var factory;		// image for factory entity
var farmbuilding;	// image for farmbuilding entity
var tree;

var entityTreeImage;

/**
 * load resources
 */
var loadResources = function()
{
	/**** add resource loading code here ****/

	// load building entity
	building = new Image();
	building.src = "./assets/entities/building.png";

	// load factory entity
	factory = new Image();
	factory.src = "./assets/entities/factory.png";

	// load farmbuilding entity
	farmbuilding = new Image();
	farmbuilding.src = "./assets/entities/farmbuilding.png";

	// load tree entity
	tree = new Image();
	tree.src = "./assets/entities/tree.png";

	entityTreeImage = new Image();
	entityTreeImage.src = "./assets/entities/tree.png";
}