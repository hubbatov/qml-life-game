import QtQuick 2.3
import QtQuick.Window 2.2

import "logic.js" as Logic

Window {
	id: lifeField

	color: "white"

	visible:  true

	maximumWidth: 500; minimumWidth: 500;
	maximumHeight: 500; minimumHeight: 500;

	signal update()

	GridView{
		id: view

		anchors.fill: parent
		model: Logic.n

		cellWidth: lifeField.width / Logic.size
		cellHeight: lifeField.height / Logic.size

		delegate: Rectangle{
			id: delegate

			property var alive

			width: view.cellWidth
			height: view.cellHeight
			color: !!alive ? "black" : "transparent"

			Component.onCompleted: {
				lifeField.onUpdate.connect(delegate.updateCell)
			}

			function updateCell(){
				if(!!Logic.matrix && !!index){
					delegate.alive = Logic.matrix[index]
				}
			}
		}
	}

	Timer{
		id: lifeTimer

		interval: 300
		repeat: true

		running: true

		onTriggered: {
			console.time("lifeCycle")
			Logic.lifeCycle()
			console.timeEnd("lifeCycle")
		}
	}

	Component.onCompleted: {
		Logic.appWindow = lifeField
		Logic.initializeRandom()
	}
}

