<script lang="ts">
import type { NodeType } from "src/types/Node.type";
import Node from "../Node.svelte";
  export let value: NodeType[]
</script>
<span>{"{"}</span>
 <br>
 <div class="emsp">
 {#each value  as item, i}
 <div class="emsp">
   <Node id={item.id} label={item.label} value={item.value} type={item.type}  />  {i !== value.length - 1 ? "," : ""}
 </div>
 {/each}
 </div>
<span>{"}"}</span>
<style>
    .emsp{
    color: #6536B7;
    margin-left: 25px;
  }
  span{
    color: #6339AE
  }
</style>