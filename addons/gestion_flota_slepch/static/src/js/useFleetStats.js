/** @odoo-module **/
import { reactive, onWillStart } from "@odoo/owl";
import { rpc } from "@web/core/network/rpc_service";

export function useFleetStats() {
  const state = reactive({
    stats: [],
    loading: true,
  });

  onWillStart(async () => {
    const result = await rpc("/flota/dashboard/metrics");
    state.stats = result;
    state.loading = false;
  });

  return { state };
}
