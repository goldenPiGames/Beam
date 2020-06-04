class DragPathLevel extends GridLevel {
	
	cutPath(pis) {
		if (this.path[this.path.length-1] == pis)
			return false;
		playSFX("blipdown");
		let cutdex = this.path.indexOf(pis);
		if (cutdex > -1)
			this.path.splice(cutdex+1);
	}
	cutPathHeadOnly(pis) {
		if (this.path[this.path.length-2] == pis)
			this.cutPath(pis);
	}
	cutPath(pis) {
		if (this.path[this.path.length-1] == pis)
			return false;
		playSFX("blipdown");
		let cutdex = this.path.indexOf(pis);
		if (cutdex > -1)
			this.path.splice(cutdex+1);
	}
	cutPathHeadOnly(pis) {
		if (this.path[this.path.length-2] == pis)
			this.cutPath(pis);
	}
	tryLinkTo(pis) {
		let head = this.path[this.path.length-1];
		var chain = head.clearChainTo(pis)
		if (chain) {
			playSFX("blip1");
			this.path.push(...chain);
			chain.forEach(pis => pis.tagged = true);
		}
	}
	checkClickAlert() {
		if (!settings.alertDrag)
			return;
		if (this.recentClicks)
			this.recentClickTime++;
		if (this.recentClickTime >= 120) {
			this.recentClicks = 0;
			this.recentClickTime = 120;
		}
		if (mouse.clicked) {
			this.recentClicks++;
			if (this.recentClicks >= 4) {
				qAlert(lg("WalkOnce-AlertDrag"));
				this.recentClicks = 0;
				this.recentClickTime = 0;
			}
		}
	}
}
Level.prototype.recentClickTime = 0;
Level.prototype.recentClicks = 0;

class DragPathTile extends UIObject {
	
	updateDisplayPosition() {
		this.displayX = this.parent.gridToPixX(this.gridX - 1/2);
		this.displayY = this.parent.gridToPixY(this.gridY - 1/2);
		this.displayWidth = this.parent.gridScale;
		this.displayHeight = this.parent.gridScale;
	}
	addTo(side) {
		var neigh = this.parent.tiles[this.gridX+directionDX(side)][this.gridY+directionDY(side)];
		if (neigh) {
			this.neighborsD[side] = neigh;
			neigh.addNeighbor(this, directionOpposite(side));
		}
	}
	addNeighbor(neigh, side) {
		this.neighborsD[side] = neigh;
	}
	clearChainTo(to) {
		if (this.canLinkTo(to))
			return [to];
		var mids = this.neighborsD.filter(m => m && typeof m == "object" && m.canLinkTo(to) && !m.tagged);
		if (mids.length == 1)
			return [mids[0], to];
		return false;
	}
}