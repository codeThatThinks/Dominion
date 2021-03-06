/**********
 * Grid Drawing Functions
 * Author: Ian Glen <ian@ianglen.me>
 *********/

/**
 * Grid class
 */
function Grid(canvas, origin, movable, tileSize, color, strokeThickness)
{
	this.center = function()
	{
		this.origin.x = this.canvas.element.width() / 2;
		this.origin.y = this.canvas.element.height() / 2;
	}

	this.centerOnPoint = function(point)
	{
		this.origin.x += (this.canvas.element.width() / 2) - (point.toOrthographicPoint(this).x + this.origin.x);
		this.origin.y += (this.canvas.element.height() / 2) - (point.toOrthographicPoint(this) + this.origin.y);
	}

	this.draw = function(topPoint, bottomPoint)
	{
		topPoint = topPoint || new OrthographicPoint(0, 0);
		bottomPoint = bottomPoint || new OrthographicPoint(this.canvas.element.width(), this.canvas.element.height());

		this.canvas.context.beginPath();

		//**** draw \ lines ****
		// convert top point to isometric
		var isometricTopPoint = topPoint.toIsometricPoint(this);

		// floor y coordinate
		var pointOnNearestLine = new IsometricPoint(isometricTopPoint.x, Math.floor(isometricTopPoint.y));

		// convert back to orthographic point (nearestLine point)
		var pointOnNearestLineAsOrthographic = pointOnNearestLine.toOrthographicPoint(this);

		// calculate distance from nearestLine point y to top point y
		var pointOnNearestLineDistance = topPoint.y - pointOnNearestLineAsOrthographic.y;

		// calculate distance from top point x to nearestLine point x: y distance ÷ tan(30º)
		var pointOnNearestLineDistanceX = pointOnNearestLineDistance / Math.tan(Math.PI / 6);

		// calculate x offset: x distance * 2
		var xOffset = pointOnNearestLineDistanceX * 2;

		// calculate distance from nearest line to top point if nearest line extended over top point: x offset * tan(30º)
		var pointOnNearestLineExtendedDistance = xOffset * Math.tan(Math.PI / 6);

		// calculate y offset: tile height - nearest line distance
		var yOffset = this.getTileHeight() - pointOnNearestLineExtendedDistance;

		//this.canvas.context.rect(pointOnNearestLineAsOrthographic.x, pointOnNearestLineAsOrthographic.y, 1, 1);

		// draw \ lines that start on left edge
		// increment y by tile height from top point.y + y offset to bottom point.y		
		for(var y = topPoint.y + yOffset; y < bottomPoint.y; y += this.getTileHeight())
		{
			// move to already calculated start point
			canvas.context.moveTo(topPoint.x, y);
			
			// determine whether line will end on bottom edge or right edge
			if((bottomPoint.y - y) / Math.tan(Math.PI / 6) < (bottomPoint.x - topPoint.x))
			{
				// line endpoint is on bottom
				canvas.context.lineTo(topPoint.x + ((bottomPoint.y - y) / Math.tan(Math.PI / 6)), bottomPoint.y);
			}
			else
			{
				// line endpoint is on right
				canvas.context.lineTo(bottomPoint.x, y + (bottomPoint.x - topPoint.x) * Math.tan(Math.PI / 6));
			}
		}

		// draw \ lines that start on top edge
		// increment x value by tile width from top point.x + x offset to bottom point.x
		for(var x = topPoint.x + xOffset; x < bottomPoint.x; x += this.getTileWidth())
		{
			canvas.context.moveTo(x, topPoint.y);

			// determine whether line will end on right edge or bottom edge
			if((bottomPoint.x - x) * Math.tan(Math.PI / 6) < (bottomPoint.y - topPoint.y))
			{
				// line endpoint is on right
				canvas.context.lineTo(bottomPoint.x, topPoint.y + ((bottomPoint.x - x) * Math.tan(Math.PI / 6)));
			}
			else
			{
				// line endpoint is on bottom
				canvas.context.lineTo(x + ((bottomPoint.y - topPoint.y) / Math.tan(Math.PI / 6)), bottomPoint.y);
			}
		}
		

		//**** draw / lines ****
		// convert top right point to isometric
		var isometricTopRightPoint = new OrthographicPoint(bottomPoint.x, topPoint.y).toIsometricPoint(this);

		// floor x coordinate
		var pointOnNearestLine = new IsometricPoint(Math.floor(isometricTopRightPoint.x), isometricTopRightPoint.y);

		// convert back to orthographic point (nearestLine point)
		var pointOnNearestLineAsOrthographic = pointOnNearestLine.toOrthographicPoint(this);

		// calculate distance from nearestLine point y to top point y
		var pointOnNearestLineDistance = topPoint.y - pointOnNearestLineAsOrthographic.y;

		// calculate distance from top point x to nearestLine point x: y distance ÷ tan(30º)
		var pointOnNearestLineDistanceX = pointOnNearestLineDistance / Math.tan(Math.PI / 6);

		// calculate x offset: x distance * 2
		var xOffset = pointOnNearestLineDistanceX * 2;

		// calculate distance from nearest line to top point if nearest line extended over top point: x offset * tan(30º)
		var pointOnNearestLineExtendedDistance = xOffset * Math.tan(Math.PI / 6);

		// calculate y offset: tile height - nearest line distance
		var yOffset = this.getTileHeight() - pointOnNearestLineExtendedDistance;

		//this.canvas.context.rect(pointOnNearestLineAsOrthographic.x, pointOnNearestLineAsOrthographic.y, 1, 1);

		// draw / lines that start on left edge
		// increment y by tile height from top point.y + y offset to bottom point.y		
		for(var y = topPoint.y + yOffset; y < bottomPoint.y; y += this.getTileHeight())
		{
			// move to already calculated start point
			canvas.context.moveTo(bottomPoint.x, y);
			
			// determine whether line will end on bottom edge or left edge
			if((bottomPoint.y - y) / Math.tan(Math.PI / 6) < (bottomPoint.x - topPoint.x))
			{
				// line endpoint is on bottom
				canvas.context.lineTo(bottomPoint.x - ((bottomPoint.y - y) / Math.tan(Math.PI / 6)), bottomPoint.y);
			}
			else
			{
				// line endpoint is on left
				canvas.context.lineTo(topPoint.x, y + (bottomPoint.x - topPoint.x) * Math.tan(Math.PI / 6));
			}
		}

		// draw / lines that start on top edge
		// increment x value by negative tile width from bottom point.x - x offset to top point.x
		for(var x = bottomPoint.x - xOffset; x > topPoint.x; x -= this.getTileWidth())
		{
			canvas.context.moveTo(x, topPoint.y);

			// determine whether line will end on left edge or bottom edge
			if((x - topPoint.x) * Math.tan(Math.PI / 6) < (bottomPoint.y - topPoint.y))
			{
				// line endpoint is on left
				canvas.context.lineTo(topPoint.x, topPoint.y + ((x - topPoint.x) * Math.tan(Math.PI / 6)));
			}
			else
			{
				// line endpoint is on bottom
				canvas.context.lineTo(x - ((bottomPoint.y - topPoint.y) / Math.tan(Math.PI / 6)), bottomPoint.y);
			}
		}

		this.canvas.context.closePath();
		this.canvas.context.strokeStyle = this.color.formatRGB();
		this.canvas.context.lineWidth = this.strokeThickness;
		this.canvas.context.stroke();
	}

	this.getTileWidth = function()
	{
		return Math.cos(Math.PI / 6) * this.tileSize * 2;
	}

	this.getTileHeight = function()
	{
		return Math.sin(Math.PI / 6) * this.tileSize * 2;
	}

	this.canvas = canvas;
	this.origin = origin;
	this.movable = movable || false;
	this.tileSize = tileSize || 70;
	this.color = color || new Color(54, 54, 54);
	this.strokeThickness = strokeThickness || 3;
}