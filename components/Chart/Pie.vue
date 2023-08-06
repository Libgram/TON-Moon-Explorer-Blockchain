<script>
import { Pie, utils } from "vue-chartjs";

export default {
  extends: Pie, utils,
  props: ["data", "options"],
  mounted() {
    this.renderChart(this.data, this.options);
  },
};
</script>