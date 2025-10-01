import * as SDK from "azure-devops-extension-sdk";
import Mermaid from "mermaid";
import mermaidViewer from './viewer.js'

await (async function () {
	SDK.init({ loaded: false })

	Mermaid.initialize({ startOnLoad: false });

	SDK.register("mermaid_renderer", function (context) {
		return mermaidViewer;
	});

	SDK.notifyLoadSucceeded();
}());
