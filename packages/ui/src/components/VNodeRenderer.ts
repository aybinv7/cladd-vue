import { defineComponent, type PropType, type VNode } from 'vue';

export default defineComponent({
  name: 'VNodeRenderer',
  props: {
    node: {
      type: Object as PropType<VNode | undefined>,
      default: undefined,
    },
  },
  setup(props) {
    return () => props.node ?? null;
  },
});
