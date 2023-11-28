import { TransitionOptions } from "../directives/image-transition.directive";

export const TransitionPresets: TransitionOptions[] = [
    {
        classNamesToAdd: ['pulse-spin-animation'],
        classNamesToRemove: ['pulse-spin-animation'],
        animationDurationMs: 1000 // This needs to match CSS
    },
    {
        classNamesToAdd: ['slide-right', 'fade', 'one-second-transition'],
        classNamesToRemove: ['slide-right', 'fade'],
        animationDurationMs: 1000 // This needs to match CSS
    },
    {
        classNamesToAdd: ['fade', 'half-second-transition'],
        classNamesToRemove: ['fade'],
        animationDurationMs: 500 // This needs to match CSS
    },
    {
        classNamesToAdd: ['slide-left', 'fade', 'one-second-transition'],
        classNamesToRemove: ['slide-left', 'fade'],
        animationDurationMs: 1000 // This needs to match CSS
    },
    {
        classNamesToAdd: ['spin-180', 'fade', 'one-second-transition'],
        classNamesToRemove: ['spin-180', 'fade'],
        animationDurationMs: 1000 // This needs to match CSS
    },
    {
        classNamesToAdd: ['blur', 'one-second-transition'],
        classNamesToRemove: ['blur'],
        animationDurationMs: 1000 // This needs to match CSS
    },
    {
        classNamesToAdd: ['zoom-out', 'fade', 'one-second-transition'],
        classNamesToRemove: ['zoom-out', 'fade'],
        animationDurationMs: 1000 // This needs to match CSS
    },
    {
        classNamesToAdd: ['zoom-in', 'fade', 'one-second-transition'],
        classNamesToRemove: ['zoom-in', 'fade'],
        animationDurationMs: 1000 // This needs to match CSS
    },
]