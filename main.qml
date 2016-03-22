import QtQuick 2.3
import QtQuick.Window 2.2

import "logic.js" as Logic

Window {
	id: lifeField

	color: "white"

	visible:  true

	width: 400
	height: 400

	ListModel{
		id: lifeCells
	}

	property var lifeField: []

	Repeater{
		model: lifeCells
		delegate: Rectangle{

			id: cell

			width: lifeField.width / Logic.xDimension
			height: lifeField.height / Logic.yDimension

			property int xPosition: index % Logic.xDimension
			property int yPosition: index / Logic.yDimension

			property bool isAlive: alive

			x: parent.width / Logic.xDimension * xPosition
			y: (parent.height / Logic.yDimension) * yPosition

			transitions: [
				Transition {
					from: "alive"; to: "dead"
					PropertyAnimation { target: cell
						from: "red"; properties: "color"; duration: 300 }
				},
				Transition {
					from: "dead"; to: "alive"
					PropertyAnimation { target: cell
						from: "green"; properties: "color"; duration: 300 }
				}
			]

			states: [
				State {
					name: "alive"
					PropertyChanges { target: cell; color: "black" }
				},
				State {
					name: "dead"
					PropertyChanges { target: cell; color: "transparent" }
				}
			]

			state: isAlive ? "alive" : "dead"
		}
	}

	Timer{
		id: lifeTimer

		interval: 500
		repeat: true

		running: true

		onTriggered: {
			Logic.lifeCycle()
		}
	}

	Component.onCompleted: {
		Logic.initialize(lifeCells, 30, 30)
	}
}

