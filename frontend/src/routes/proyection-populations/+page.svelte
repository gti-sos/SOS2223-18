<script>
    // @ts-nocheck
        import { onMount } from "svelte";
        import { dev } from "$app/environment";
        import { Button, Table } from 'sveltestrap';
        onMount(async () =>{
            getPopulations();
        });
        let API = "/api/v1/proyection-populations";
        let mensajeUsuario = "";
        if(dev)
            API = "http://localhost:5173"+API
            
        let populations = [];
        let newPopulationsProvince = "Provincia";
        let newPopulationsPeriod = "Año";
        let newPopulationsAsset = "Comisión anual";
        let newPopulationsTax = "Impuesto";
        let newPopulationsAge = "Edad";
        let newPopulationsGender = "Género";
        let result = "";
        let resultStatus = "";
        async function getPopulations(){
            resultStatus = result = "";
            const res = await fetch(API, {
                method: "GET"
            });
            try{
                const data = await res.json();
                result = JSON.stringify(data, null, 2);
                populations = data;
            }catch(error){
                console.log(`Error parseando el resultado: ${error}`);
            }
            const status = await res.status;
            resultStatus = status;
        }
        let insertedData = [];
        async function createPopulations(){
            resultStatus = result = "";
            const newPopulations = {
                province: newPopulationsProvince,
                Period: parseInt(newPopulationsPeriod),
                gender: parseFloat(newPopulationsTax),
                tax: parseFloat(newPopulationsTax),
                asset_thousand: parseFloat(newPopulationsAsset),
                age: parseFloat(newPopulationsAge)
            };
    
            // Comprobar si el nuevo dato ya ha sido insertado previamente
            const existingData = insertedData.find(data => 
                data.province === newPopulationsProvince && data.Period === newPopulationsPeriod && data.gender === newPopulationsGender
                    && data.tax === newPopulationsTax && data.asset_thousand === newPopulationsAsset && data.age === newPopulationsAge
            );
            if (existingData) {
                mensajeUsuario = "Ya existe ese dato";
                return;
            }
    
            const res = await fetch(API, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newPopulations)
            });
    
            const status = await res.status;
            resultStatus = status;
            if (status == 201) {
                getPopulations();
                mensajeUsuario = "Se ha creado el nuevo dato introducido";
                insertedData.push(newPopulations);
            } else if (status == 409) {
                mensajeUsuario = "El dato introducido ya existe";
                getPopulations();
            } else if (status == 400) {
                mensajeUsuario = "Las propiedades introducidas no tienen un formato correcto";
                getPopulations();
            } else {
                mensajeUsuario = "No se ha podido crear el dato introducido";
                getPopulations();
            }
            /*resultStatus = result = "";
            const res = await fetch(API, {
                method: "POST",
                headers:{
                    "Content-Type": "application/json"
                },
                body:JSON.stringify({
                    province: newPopulationsProvince,
                    Period: newPopulationsPeriod,
                    gender: newPopulationsTax,
                    minimun_temperature: newPopulationsMinimunTemperature,
                    medium_temperature: newPopulationsMediumTemperature
                })
            });
            const status = await res.status;
            resultStatus = status;
            if(status==201){
                getPopulations();
                mensajeUsuario = "Se ha creado el nuevo dato introducido";
            }else if(status==409){
                mensajeUsuario = "El dato introducido ya existe";
                getPopulations();
            }else if(status==400){
                mensajeUsuario = "Las propiedades introducidas no tienen un formato correcto";
                getPopulations();
            }else{
                mensajeUsuario = "No se ha podido crear el dato introducido";
                getPopulations();
            }*/      
        }
        async function deletePopulations(PopulationsProvince){
            resultStatus = result = "";
            const res = await fetch(API+"/"+PopulationsProvince, {
                method: "DELETE"
            });
            const status = await res.status;
            resultStatus = status;
            if(status==200){
                getPopulations();
                mensajeUsuario = "Se ha borrado correctamente el dato seleccionado";
            }else{
                mensajeUsuario = "No se ha podido borrar el dato";
            }
        }
        async function deletePopulationsAll(){
            resultStatus = result = "";
            const res = await fetch(API, {
                method: "DELETE"
            });
            const status = await res.status;
            resultStatus = status;
            if(status==200 || status == 204){
                await getPopulations();
                mensajeUsuario = "Se han borrado correctamente los datos";
            }else{
                mensajeUsuario = "No se han podido borrar los datos";
            }
        }
    </script>

    <h1 style="text-align: center; font-family:'Times New Roman', Times, serif; font-size: 60px;">Datos Populations</h1>
    <p></p>
    {#if mensajeUsuario !=""}
    <h2 style="color: red; text-align: center; font-family:Arial, Helvetica, sans-serif">{mensajeUsuario}</h2>
    {/if}

    <Table striped>
        <thead>
          <tr>
            <th style="text-decoration: underline;">Provincia:</th>
            <th style="text-decoration: underline;">Año:</th>
            <th style="text-decoration: underline;">Máxima Temperatura:</th>
            <th style="text-decoration: underline;">Mínima Temperatura:</th>
            <th style="text-decoration: underline;">Media Temperatura:</th>
            <th style="text-decoration: underline;">Acción:</th>
          </tr>
        </thead>
        <tbody>
            <tr>
                <td><input bind:value={newPopulationsProvince}></td>
                <td><input bind:value={newPopulationsPeriod}></td>
                <td><input bind:value={newPopulationsTax}></td>
                <td><input bind:value={newPopulationsMinimunTemperature}></td>
                <td><input bind:value={newPopulationsMediumTemperature}></td>
                <td><Button color="success" on:click={createPopulations}>Crear</Button></td>
            </tr>
        
        {#each populations as Populations }
          <tr>
            <td><a href="/Populations/{Populations.province}/{Populations.Period}">{Populations.province}</a></td>
            <td>{Populations.Period}</td>
            <td>{Populations.gender}</td>
            <td>{Populations.minimun_temperature}</td>
            <td>{Populations.medium_temperature}</td>
            <td><Button color="danger"on:click={deletePopulations(Populations.province)}>Borrar</Button></td>
          </tr>
        {/each}
        </tbody>
    </Table>
    
    <div style="text-align: center;">
        <Button color="danger" on:click={deletePopulationsAll}>Borrar Datos</Button>
    </div>
    
    {#if resultStatus != ""}
        <p>
            <strong>Número de datos: {populations.length}</strong>
        </p>
        <strong>Result:</strong>
        <pre>
    {"Código de estado: "+resultStatus}
{result}
        </pre>
    {/if}