if ($('.tp_reveal_anim').length > 0) {
let tl = gsap.timeline({
scrollTrigger: {
trigger: ".tp_reveal_anim",
start: "top 90%",
duration: 2,
end: "bottom 60%",
scrub: false,
markers: false,
toggleActions: "play none none reverse"
}
});
let split = new SplitText(".tp_reveal_anim", { type: "lines" });
gsap.set(".tp_reveal_anim", { perspective: 400 });
split.split({ type: "lines" });
tl.from(split.lines, {
duration: 1,
delay: 0.5,
opacity: 0,
rotationX: -80,
force3D: true,
transformOrigin: "top center -50",
stagger: 0.1
});
}


