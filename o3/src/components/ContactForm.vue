<script setup lang="ts">


import { contact_info_store } from '@/stores/contact_info'
import axios from 'axios'

const info = contact_info_store();

function validate() {
    var valid_name = info.name.length > 0;

    var valid_email = String(info.email).toLowerCase().match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )?.length != 0;

    var valid_message = info.message.length > 0;

    return valid_name && valid_email && valid_message;
}

async function validate_and_post() {
    if (!validate()) {
        console.log("Form not submitted: invalid data");
        window.alert("Form not submitted: invalid data");
        return;
    }

    console.log("Form submitted");

    // Copy input data to another datastructure
    const data = { 
        name: info.name,
        email: info.email,
        msg: info.message
    };

    // Send the input data to the server
    const response = await axios.post("https://my-json-server.typicode.com/Sleiphan/mock-server/Testing", data);

    console.log(response);

    // Reset input fields
    info.name = '';
    info.email = '';
    info.message = '';
}
/**/
</script>



<template>
    <div class="outer-form">
            <form class="form" v-on:submit.prevent="validate_and_post">
                <div class="name-and-email">
                    <div class="name">
                        <label for="f_name">Tell us your name</label>
                        <input id="f_name" class="text-area-custom" placeholder="Enter your name" v-model="info.name" data-testid="f_name" required>
                    </div>
                
                    <div class="email">
                        <label for="f_email">Enter your email</label>
                        <input id="f_email" class="text-area-custom" placeholder="Enter your email" v-model="info.email" data-testid="f_email" type="email" required>
                    </div>
                </div>

                <hr class="form-line">
                
                <div class="message-div">
                    <label for="f_message">Message</label>
                    <textarea class="text-area-message" id="f_message" type="text" placeholder="Your message here..." v-model="info.message" data-testid="f_msg" required></textarea>
                </div>
            
                <input class="submit-button" type="submit" value="Send" data-testid="f_button">
            </form>
    </div>
</template>



<style scoped>

.outer-form {
    border-color: rgba(0, 255, 136, 0.458);
    border-style:groove;
    border-radius: 25px;

    padding: 10px;
    padding-bottom: 40px;
    width: 500px;
    max-width: 600px;

    display: grid;
}

.form {
    color: rgba(255, 255, 255, 0.68);

    margin: 10px;
    color: black;

    display: grid;

}

.message-div {
    padding: 10px;
    margin: 0px;

    display: inline-grid;
}

.name-and-email {
    margin: 0px;
    padding: 10px;

    
    display: inline-grid;
}

.name {
    padding: 4px;
    display: grid;
}

.email {
    padding: 4px;
    display: grid;
}

input {
    border: 0px;
    padding-top: 15px;
    display: block;
}

label {
    font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 30px;

    color: rgb(160, 160, 160);
}

.text-area-custom {
    background-color: rgba(160, 160, 160, 0);
    border: none;
    outline: none;
    color: rgb(160, 160, 160);

    font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 16px;
}

.text-area-message {
    background-color: rgba(160, 160, 160, 0);
    border: none;
    outline: none;
    color: rgb(160, 160, 160);

    font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 16px;

    height: 250px;
    resize: vertical;
}

.form-line {
    margin-left:  25px;
    margin-right: 25px;
}

.submit-button {
    text-align: center;
    background-color: rgba(0, 255, 136, 0.458);
    

    font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 16px;

    color: rgba(255, 255, 255, 0.6);

    transition: 0.3s;
    
    border: 5px;
    padding: 10px;
    border-radius: 15px;
    
}

.submit-button:hover {
    background-color: rgba(0, 255, 0, 0.66);
    color: rgba(0, 0, 0, 0.659);

    padding-top: 20px;
    padding-bottom: 20px;

    margin-left: 80px;
    margin-right: 80px;
}
</style>