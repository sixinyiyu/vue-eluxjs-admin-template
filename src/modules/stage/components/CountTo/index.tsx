import { TransitionPresets, useTransition } from '@vueuse/core';
import {computed, onMounted, ref, watch, watchEffect, defineComponent, } from 'vue';
import { isNumber } from '../../utils/tools';

type TansitionKey = keyof typeof TransitionPresets;

interface Props {
  /** 初始值 */
  startValue: number;
  /** 结束值 */
  endValue: number;
  /** 动画时长 */
  duration: number;
  /** 自动动画 */
  autoplay?: boolean;
  /** 进制 */
  decimals?: number;
  /** 前缀 */
  prefix?: string;
  /** 后缀 */
  suffix?: string;
  /** 分割符号 */
  separator?: string;
  /** 小数点 */
  decimal?: string;
  /** 使用缓冲动画函数 */
  useEasing?: boolean;
  /** 缓冲动画函数类型 */
  transition?: TansitionKey;
};

const Component = defineComponent<Props>({
  // eslint-disable-next-line vue/require-prop-types
  props: ['startValue', 'endValue', 'duration', 'autoplay', 'decimals', 'prefix', 'suffix', 'separator', 'decimal', 'useEasing', 'transition'] as any,
  emits: ["on-started", "on-finished"],
  setup(props, {emit}) {
    const source = ref<number>(props.startValue);
    let outputValue = useTransition(source);
    const value = computed(() => formatNumber(outputValue.value));
    const disabled = ref(false);

    const run = () => {
        outputValue = useTransition(source, {
            disabled,
            duration: (props.duration * 1000),
            onStarted: () => emit('on-started'),
            onFinished: () => emit('on-finished'),
            ...((props.useEasing || true) ? { transition: TransitionPresets[props.transition || 'easeInSine'] } : {})
        });
        console.log(outputValue.value);
    };

    const start = () => {
        run();
        source.value = props.endValue;
    };

    const formatNumber = (num: number | string) => {
        if (!num) {
          return '';
        }
        const { decimals, decimal, separator , suffix, prefix } = props;
        let number = Number(num).toFixed(decimals);
        number += '';
        const x = number.split('.');
        let x1 = x[0];
        const x2 = x.length > 1 ? decimal + x[1] : '';
        const rgx = /(\d+)(\d{3})/;
        if (separator && !isNumber(separator)) {
          while (rgx.test(x1)) {
            x1 = x1.replace(rgx, `$1${separator}$2`);
          }
        }
        return (prefix || '') + x1 + x2 + (suffix || '');
    };

    watch([() => props.startValue, () => props.endValue], () => {
        if (props.autoplay) {
          start();
        }
    });

    watchEffect(() => {
        source.value = props.startValue;
    });

    onMounted(() => {
        if (props.autoplay) {
            start();
        }
    });

    return () => {
      return (
        <span>{value.value}</span>
      );
    };
  },
});

export default Component;
