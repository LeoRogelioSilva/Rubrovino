<template>
  <q-page class="bg-image-opacity-60">
    <div style="height: 100vh;">

    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'IndexPage'
})
</script>
<style lang="css">
.bg-image-opacity-60 {
  background-image: url('/bgimg.png');
  background-size: cover;
  background-attachment: fixed;
  opacity: 0.1;
}
</style>
