import QtQuick 2.3
import QtQuick.Window 2.2

import "logic.js" as Logic

Window {
	id: lifeField

	color: "white"

	visible:  true

	width: 300
	height: 300

	Repeater{
		id: rows
		delegate: Repeater{

			id: columns
			model: modelData

			property int rowIndex: index

			delegate: Rectangle{
				id: cell

				width: lifeField.width / Logic.xDimension
				height: lifeField.height / Logic.yDimension

				property int xPosition: index
				property int yPosition: columns.rowIndex

				property bool isAlive: modelData

				x: cell.width * xPosition
				y: cell.height * yPosition

				color: isAlive ? "black" : "transparent"
			}

			Component.onCompleted: {
				console.timeEnd("delegate create")
			}
		}
	}

	Timer{
		id: lifeTimer

		interval: 100
		repeat: true

		running: true

		onTriggered: {
			console.time("delegate create")
			Logic.lifeCycle()
			rows.model = Logic.model
		}
	}

	Component.onCompleted: {
		Logic.initializeRandom(40, 40)
		rows.model = Logic.model
	}
}

