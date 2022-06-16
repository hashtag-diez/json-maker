<script lang="ts">
  export let id: number
  export let label: string
  export let value: string
  export let type: string
</script>
<p>
  {label} : {value}
</p>
<style>
  p{
    margin: 0;
    color: white;
  }
</style>