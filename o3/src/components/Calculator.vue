<script setup lang="ts">

import { ref } from 'vue';
// import { reactive } from 'vue';
import axios from 'axios';



var display = ref("0");
var queue = ref("0");
var button_c = ref("C");

var buffer = 0;
var calc_operator = '';
var transition = false;
var calculation_complete = false;
var last_answer = "0";

var history_elements:string[] = [];
var history = ref(history_elements);



function clear() {
    if (button_c.value == "CE") {
        button_c.value = "C";
        display.value = "0";
    } else {
        queue.value = "0";
        buffer = 0;
        calc_operator = '';
    }

    if (calculation_complete)
        queue.value = "0";
}

function enter_number(number: Number) {
    if (display.value.length >= 16)
        return;

    button_c.value = "CE";

    if (display.value == "0" || transition) {
        display.value = number.toString();
        transition = false;
    }
    else
        display.value = display.value.concat(number.toString());

    if (calculation_complete) {
        queue.value = "0";
        calculation_complete = false;
    }
}

function period() {
    if (display.value.includes('.'))
        return;

    display.value = display.value.concat('.');
}

function backspace() {
    if (display.value.length > 1) {
        display.value = display.value.substring(0, display.value.length - 1);
        transition = false;
    }
    else
        display.value = "0";
}

function use_answer() {
    display.value = last_answer.toString();

}

function operator(op: string) {
    if (op == '-' && display.value == '0') {
        display.value = '-';
        transition = false;
        return;
    }

    calculation_complete = false;

    calc_operator = op;
    queue.value = display.value.concat(" " + op + " ");
    buffer = Number(display.value);
    transition = true;
}

async function equals_button()  {
    // last_answer = calculate_local();
    last_answer = await calculate_remote();
    
    var first  = buffer;
    var second = Number(display.value);

    // add_to_history(first, calc_operator, second, last_answer);
    transition = true;
    calculation_complete = true;
    queue.value = queue.value.concat(display.value.concat(" ="))
    display.value = last_answer.toString();

    add_to_history(first, calc_operator, second, last_answer);

    if (last_answer == "undefined")
        last_answer = "0";
}

function calculate_local() {
    var first  = buffer;
    var second = Number(display.value);

    if (calc_operator == '/' && second == 0)
        return "undefined";

    var answer = 0;

    switch (calc_operator) {
        case '+': answer = first + second; break;
        case '-': answer = first - second; break;
        case '*': answer = first * second; break;
        case '/': answer = first / second; break;
    }

    return answer.toString();
}

async function calculate_remote() {
    var first  = buffer;
    var second = await Number(display.value);

    if (calc_operator == '/' && second == 0)
        return "undefined";

    // Bygger det matematiske uttrykket som en string
    
    var query = {
        n1 : first,
        n2 : second,
        op : calc_operator
    }; // await (first.toString() + calc_operator.toString() + second.toString());

    // Sender uttrykket til endpointet
    const response = await axios.post("http://localhost:8080/calculate", query);
    
    // Henter ut svaret fra responsen
    var answer = await Number(response.data);

    return answer.toString();
}

function add_to_history(first:Number, calculator_operator:string, second:Number, answer:String) {
    var text = first.toString() + " " + calculator_operator + " " + second.toString() + " = " + answer;

    history.value.push(text);
    return;
}

</script>





<template>
    <div id="calculator" class="calculator">
        <div id="calculator-main" class="calculator-main">
            <label id="calculator-queue" data-testid="calc-queue" class="calculator-queue">{{ queue }}</label>
            <label id="calculator-display" data-testid="calc-display" class="calculator-display">{{ display }}</label>
            <hr>
            <div id="calculator-buttons" class="calculator-buttons">
                <button type="button" class="calculator-button" data-testid="calculator-button-c" v-on:click="clear()">{{ button_c }}</button>
                <button type="button" class="calculator-button" data-testid="calc-btn-answer" v-on:click="use_answer()">ANS</button>
                <button type="button" class="calculator-button" data-testid="calc-btn-delete" v-on:click="backspace()">DEL</button>
                <button type="button" class="calculator-button" data-testid="calc-btn-divide" v-on:click="operator('/')">/</button>
                <button type="button" class="calculator-button" data-testid="calc-btn-7" v-on:click="enter_number(7)">7</button>
                <button type="button" class="calculator-button" data-testid="calc-btn-8" v-on:click="enter_number(8)">8</button>
                <button type="button" class="calculator-button" data-testid="calc-btn-9" v-on:click="enter_number(9)">9</button>
                <button type="button" class="calculator-button" data-testid="calc-btn-multiply" v-on:click="operator('*')">*</button>
                <button type="button" class="calculator-button" data-testid="calc-btn-4" v-on:click="enter_number(4)">4</button>
                <button type="button" class="calculator-button" data-testid="calc-btn-5" v-on:click="enter_number(5)">5</button>
                <button type="button" class="calculator-button" data-testid="calc-btn-6" v-on:click="enter_number(6)">6</button>
                <button type="button" class="calculator-button" data-testid="calc-btn-minus" v-on:click="operator('-')">-</button>
                <button type="button" class="calculator-button" data-testid="calc-btn-1" v-on:click="enter_number(1)">1</button>
                <button type="button" class="calculator-button" data-testid="calc-btn-2" v-on:click="enter_number(2)">2</button>
                <button type="button" class="calculator-button" data-testid="calc-btn-3" v-on:click="enter_number(3)">3</button>
                <button type="button" class="calculator-button" data-testid="calc-btn-plus" v-on:click="operator('+')">+</button>
                <button type="button" class="calculator-button"></button>
                <button type="button" class="calculator-button" data-testid="calc-btn-0" v-on:click="enter_number(0)">0</button>
                <button type="button" class="calculator-button" data-testid="calc-btn-period" v-on:click="period()">.</button>
                <button type="button" class="calculator-button" data-testid="calc-btn-equals" v-on:click="equals_button()">=</button>
            </div>
        </div>
        <div id="calculator-history" class="calculator-history">
            <ol>
                <li v-for="(x, index) in history" :key="index">{{ x }}</li>
            </ol>
        </div>
    </div>
</template>





<style scoped>
.calculator {
    display: inline;
    padding-left: 2rem;
    justify-content: center;

    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    font-size: 18px;
}

.calculator-main {
    display: inline;
}

.calculator-queue {
    display: block;
    text-align: right;
    color: grey;
}

.calculator-display {
    display: block;
    font-size: 50px;
    text-align: center;
}

.calculator-buttons {
    display: grid;
    grid-template-rows: 20%;
    grid-template-columns: 25% 25% 25% 25%;
    
    aspect-ratio: 1;
}

.calculator-button {
    font-size: 18px;
    color: rgb(0, 255, 115);
    background-color: rgb(0, 255, 115, 0);
    border-color: rgb(0, 255, 115);
}

.calculator-history {
    display: inline;
    background-color: white;
}

</style>
