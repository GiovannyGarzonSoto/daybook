<template>
  <div class="entry-container mb-3 pointer p-2"
  @click="$router.push({name: 'entry', params: {id: 10}})"
  >
    <div class="entry-title d-flex">
        <span class="text-success fs-5 fw-bold">15</span>
        <span class="mx-1 fs-5">Julio</span>
        <span class="mx-2 fw-light">2021, jueves</span>
    </div>
    <div class="entry-description">
        Sit ipsum et consectetur velit ut eu minim. Exercitation labore laboris amet fugiat eu est cupidatat eu laboris consequat tempor. Quis velit tempor consequat culpa ut id ullamco tempor mollit proident est Lorem deserunt qui. Adipisicing sunt Lorem amet quis aliqua veniam. Elit consectetur consectetur tempor pariatur esse dolore laboris qui officia cupidatat. In nulla consectetur laborum in est. Occaecat labore Lorem est mollit eiusmod Lorem aliquip duis commodo enim dolore adipisicing aliqua voluptate.
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.entry-container{
    border-bottom: 1px solid #2c3e50;
    transition: 0.2 all ease-in;

    &:hover{
        background-color: lighten($color: grey, $amount: 45);
        transition: 0.2s all ease-in;
    }
}
.entry-description{
    font-size: 12px;
}
</style>