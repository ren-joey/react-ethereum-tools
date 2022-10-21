declare namespace utils {
    export interface CallbackFunction {
        (): void
    }

    export interface DiceConfig {
        /**
         * @param total - 所有骰子總和
         */
        total: number,

        /**
         * @param left - 剩餘的骰子數量
         */
        left: number,

        /**
         * @param known - 已知的骰子
         * @defaultValue []
         */
        known?: number[]
    }

    export interface Offset {
        /**
         * @param top - style top 位置，不包含 px
         */
        top: number,

        /**
         * @param left - style left 位置，不包含 px
         */
        left: number
    }

    export interface TopAndLeft {
        /**
         * @param top - 與螢幕上緣的距離，不包含 px
         */
        top: number,

        /**
         * @param left - 與螢幕左緣的距離，不包含 px
         */
        left: number
    }

    export interface IndexAndStyle {
        /**
         * @param index - 被影響的文字 index 範圍
         * @example #1 單一標示法 1, 2, 3
         * @example #2 範圍標示法 '1-3'
         */
        index: (number|string)[],

        /**
         * @param style - 被影響的文字所指定的 css style
         * @example 'color: #f00; font-size: 1.4rem; font-weight: bolder'
         */
        style: string
    }
}

export { utils as default };
