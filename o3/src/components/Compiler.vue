<script setup lang="ts">

import { ref } from 'vue';
import axios from 'axios';

var source_code = ref("#include <stdio.h>\n\nint main() {\n    printf(\"Hello World! c:\\n\");\n\n    for (int i = 0; i < 5; i++)\n        printf(\"%d\\n\", i);\n\n    return 0;\n}");
var output = ref("");

async function compile_and_run() {

    const data = { source_code: source_code.value }
    console.log(data.source_code);

    const response = await axios.post("http://localhost:8080/run_code", data);

    output.value = response.data;
}

</script>



<template>
    <textarea v-model="source_code">{{ source_code }}</textarea>
    <button type="button" v-on:click="compile_and_run()">Compile and run</button>
    <textarea v-bind:value="output"></textarea>
</template>



<style scoped>

</style>