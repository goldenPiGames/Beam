function drawBeam(paff) {
	ctx.strokeStyle = settings.beam_color;
	ctx.lineWidth = 4;
	ctx.stroke(paff);
}

function drawBeamStop(x, y) {
	particles.push(randomCursorEmber(x, y, settings.beam_color));
}