import {computed, defineComponent, } from 'vue';

interface Props {
    /** 渐变开始的颜色 */
    startColor?: string;
    /** 渐变结束的颜色 */
    endColor?: string;
};

const Component = defineComponent<Props>({
  // eslint-disable-next-line vue/require-prop-types
  props: ['startColor', 'endColor'] as any,
//   emits: ["on-change"],
  setup(props, {emit, slots }) {
    const gradientStyle = computed(() => `linear-gradient(to bottom right, ${props.startColor}, ${props.endColor})`);

    return () => {
      return (
        <div class="p-16px rounded-16px text-white" style={{ backgroundImage: gradientStyle.value }}>
            {slots.default ? slots.default() : null}
        </div>
      );
    };
  },
});

export default Component;
