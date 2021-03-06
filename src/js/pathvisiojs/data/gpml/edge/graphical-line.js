"use strict";
pathvisiojs.data.gpml.edge.graphicalLine = function(){

  //*
  //var jsonPathway = {};
  // TODO this isn't getting the linetype info for determining whether activity is direct or indirect yet
  var gpmlArrowHeadToSemanticMappings = {
    'Arrow':'arrow'
  };
  //*/

  function toRenderableJson(gpml, gpmlGraphicalLine, pathwayIri, callback) {
    var jsonAnchorGraphicalLine, anchor, jsonAnchor, points, jsonPoints, graphicalLineType, target, targetId, groupRef;
    try {
      pathvisiojs.data.gpml.edge.toRenderableJson(gpmlGraphicalLine, pathwayIri, function(jsonGraphicalLine) {
        //console.log('jsonGraphicalLine');
        //console.log(jsonGraphicalLine);

        jsonGraphicalLine['@type'].push('GraphicalLine');
        jsonGraphicalLine.renderableType = 'GraphicalLine';

        points = gpmlGraphicalLine.selectAll('Point');

        var firstPoint = points[0][0];
        var lastPoint = points[0][points[0].length - 1];

        if (!!firstPoint.getAttribute('ArrowHead')) {
          jsonGraphicalLine.markerStart = strcase.paramCase(firstPoint.getAttribute('ArrowHead'));
        }
        else {
          jsonGraphicalLine.markerStart = 'none';
        }

        if (!!lastPoint.getAttribute('ArrowHead')) {
          jsonGraphicalLine.markerEnd = strcase.paramCase(lastPoint.getAttribute('ArrowHead'));
        }
        else {
          jsonGraphicalLine.markerStart = 'none';
        }

        // TODO handle this properly. Right now, we can't render graphical lines with
        // connector type of elbow or curve.

       jsonGraphicalLine.ConnectorType = 'Straight';

        callback(jsonGraphicalLine);
      })
    }
    catch (e) {
      throw new Error('Error converting GraphicalLine to renderable json: ' + e.message);
    }
  }

  /*
  function toRenderableJson(gpmlEdge, jsonEdge, callback) {
    try {
      jsonEdge.id = gpmlEdge.attr('GraphId');
      jsonEdge.renderableType = 'edge';
      var connectorType = gpmlEdge.select('Graphics').attr('ConnectorType');
      if (!!connectorType) {
        jsonEdge.connectorType = connectorType.toLowerCase();
      }
      else {
        jsonEdge.connectorType = 'straight';
      }

      var attribute;
      var strokeStyle = strokeStyleMappings[String(gpmlEdge.select('Graphics').attr('LineStyle'))];
      if (!!strokeStyle) {
        jsonEdge.strokeStyle = strokeStyle;
      }
      else {
        attribute = gpmlEdge.select('Attribute'); 
        if (!!attribute[0][0]) {
        console.log(attribute);
          if ((attribute.attr('Key') === "org.pathvisiojs.DoubleLineProperty") && (attribute.attr('Value') === "Double")) {
            jsonEdge.strokeStyle = 'double';
          }
        }
      }

      var stroke = String(gpmlEdge.select('Graphics').attr('Color'));
      if (!!stroke) {
        var color = new RGBColor(stroke);
        if (color.ok) {
          jsonEdge.stroke = color.toHex();
        }
      }

      jsonEdge.strokeWidth = gpmlEdge.select('Graphics').attr('LineThickness');

      jsonEdge.zIndex = gpmlEdge.select('Graphics').attr('ZOrder');

      var xRef = gpmlEdge.select('Xref');
      if (xRef > 0) {
        if ((!xRef.attr('Database')) && (!xRef.attr('ID'))) {
          jsonEdge.xRef = xRef;
        }
      }

      var gpmlPoints = gpmlEdge.selectAll('Point');
      self.gpmlPoints = gpmlPoints;
      var markerStart = markerMappings[gpmlPoints[0][0].getAttribute('ArrowHead')];
      if (!!markerStart) {
        jsonEdge.markerStart = markerStart;
      }
      else {
        jsonEdge.markerStart = 'none';
      }
      var lastPointIndex = gpmlPoints[0].length - 1;
      var markerEnd = markerMappings[gpmlPoints[0][lastPointIndex].getAttribute('ArrowHead')];
      if (!!markerEnd) {
        jsonEdge.markerEnd = markerEnd;
      }
      else {
        jsonEdge.markerEnd = 'none';
      }

      var jsonPoints = [];
      gpmlPoints.each(function() {
        pathvisiojs.data.gpml.edge.point.toRenderableJson(d3.select(this), function(jsonPoint) {
          jsonPoints.push(jsonPoint);
        });
      });
      jsonEdge.points = jsonPoints;
      callback(jsonEdge);
    }
    catch (e) {
      console.log("Error converting edge to json: " + e.message);
      return e;
    }
  }
  //*/

  return {
    toRenderableJson:toRenderableJson
  };
}();
