const mermaidViewer = (function () {
	"use strict";
	return {
		renderContent: function (rawContent, options) {
			var rendered = document.getElementById('viewer-content-display');
			var graphDefinition = rawContent;
			Mermaid.mermaidAPI.render('graphDiv', graphDefinition).then(({ svg, bindFunctions }) => {
				rendered.innerHTML = svg;
				bindFunctions?.(rendered);
			});
		}
	};
}());

export default mermaidViewer
