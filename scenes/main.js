
kaboom({
	global: true,
	fullscreen: true,
	scale: 2,
});

loadSprite("jason", "sprites/jason_small.png");
loadShader("test", null, `
uniform float u_time;
vec2 u_mpos = vec2(0.5, 0.5);


vec4 frag(vec3 pos, vec2 uv, vec4 color, sampler2D tex) {
	vec2 pp = uv - u_mpos;
	float angle = atan(pp.y, pp.x);
	float dis = length(pp);
	float c = sin(dis * 48.0 + u_time * 8.0 + angle);
	return vec4(c, c, c, 1);
}
`);

scene("main", () => {
	add([
		rect(width(), height()),
		shader("test"),
		{
			update() {
				this.uniform["u_time"] = time();
			},
		}
	]);

  const mark = add([
		sprite("jason"),
		pos(width() / 2, height() / 2),
		rotate(0),
   
		origin("center"),
	]);

	mark.action(() => {
		mark.angle += dt();
	});
});

start("main");
