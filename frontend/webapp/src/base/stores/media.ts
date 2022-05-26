import { readable } from 'svelte/store'
import { breakpoints } from '../css/breakpoints'

type IBreakpointBooleans = {
	xs: boolean
	sm: boolean
	md: boolean
	lg: boolean
	xl: boolean
	xxl: boolean
}

const breakpointBooleansInitalValues: IBreakpointBooleans = {
	xs: false,
	sm: false,
	md: false,
	lg: false,
	xl: false,
	xxl: false,
}

export const media = readable(breakpointBooleansInitalValues, (set) => {
	const intervall = setInterval(() => {
		const { innerWidth } = window
		const breakpointBools: IBreakpointBooleans = {
			xs: innerWidth >= breakpoints.xs,
			sm: innerWidth >= breakpoints.sm,
			md: innerWidth >= breakpoints.md,
			lg: innerWidth >= breakpoints.lg,
			xl: innerWidth >= breakpoints.xl,
			xxl: innerWidth >= breakpoints.xxl,
		}
		set(breakpointBools)
	}, 100)
	return () => {
		clearInterval(intervall)
	}
})
