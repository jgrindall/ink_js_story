
declare module '*.vue' {
	import { Component } from 'vue'
	var component: Component
	export default component
}

declare module '*.vue' {
	import type { DefineComponent } from 'vue'
	var component: DefineComponent<{}, {}, any>
	export default component
}