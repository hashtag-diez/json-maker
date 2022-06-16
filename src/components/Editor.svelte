<script lang="ts">
  export let listPreview: object[];
  export let id: number;
  let edited: boolean = false
  let name: string = ""
  let value: string = ""
  let type: string = ""

  const updateListPreview = () => {
    const oldListPreview = listPreview
    oldListPreview.push({
      id: id,
      label: name,
      type: type,
      value: value
    })
    listPreview = oldListPreview
    edited = true
    console.log(listPreview)
  }
</script>
<div>
  <input bind:value={name} type="text" name="" placeholder="Name" id="">
  <select bind:value={type} name="" id="">
    <option value="">type</option>
    <option value="object">Object</option>
    <option value="array">String</option>
    <option value="number">Number</option>
    <option value="array">Array</option>
    <option value="boolean">Boolean</option>
  </select>
  <input bind:value={value} type="text" placeholder="Value" name="" id="">
  {#if !edited && name!==null && value!=="" && type!==null}
    <button on:click={() => updateListPreview()}>GO</button>
  {/if}  
</div>