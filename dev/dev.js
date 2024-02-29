import md from './test.md'

export default {
	render: function () {
		document
			.getElementById('md-mermaid-viewer')
			.innerHTML = md
	}
}
