<script>
    // @ts-nocheck
        import { onMount } from "svelte";
        import { dev } from "$app/environment";
        import { Button, Table } from 'sveltestrap';
        import { page } from "$app/stores";
        onMount(async () =>{
            getVariations_dato();
        });
        let mensajeUsuario = "";
        let Province = $page.params.Province;
        let Month = $page.params.Month;
        let API = "/api/v2/residential-variations-stats/"+Province+ "/" +Month;
        if(dev)
            API = "http://localhost:3000"+API
    
        let updateVariationsProvince = Province;
        let updateVariationsMonth = Month; 
        let updateVariationsImmigrant = "Inmigrantes";
        let updateVariationsEmigrant= "Emigrantes";
        let updateVariationsTotal = "Total";
        let result = "";
        let resultStatus = "";
        async function getVariations_dato(){
            resultStatus = result = "";
            const res = await fetch(API, {
                method: "GET"
            });
            try{
                const data = await res.json();
                result = JSON.stringify(data, null, 2);
                updateVariationsProvince = data.Province;
                updateVariationsMonth = data.Month;
                updateVariationsImmigrant = data.immigrant;
                updateVariationsEmigrant = data.emigrant;
                updateVariationsTotal = data.total;
                
            }catch(error){
                console.log(`Error parseando el resultado: ${error}`);
            }
            
            const status = await res.status;
            resultStatus = status;
            if(status==404){
                mensajeUsuario = `La ruta solicitada "${Province}/${Month}" no existe`;
            }
        }
        async function updateVariations(){
            resultStatus = result = "";
            const res = await fetch(API, {
                method: "PUT",
                headers:{
                    "Content-Type": "application/json"
                },
                body:JSON.stringify({
                    Province: updateVariationsProvince,
                    Month: updateVariationsMonth,
                    immigrant: updateVariationsImmigrant,
                    emigrant: updateVariationsEmigrant,
                    total: updateVariationsTotal
                })
            });
            const status = await res.status;
            resultStatus = status;
            if(status==200){
                getVariations_dato();
                mensajeUsuario = "Se ha actualizado el dato";
            }else if(status==400){ 
                mensajeUsuario = "Los datos introducidos no son válidos";
            }else{
                mensajeUsuario = "No se ha podido actualizar el dato";
            }       
        }
    </script>

    <h1 style="text-align: center; font-family:'Times New Roman', Times, serif; font-size: 60px;">Variaciones residenciales</h1>
      
    {#if mensajeUsuario !=""}
        <h2 style="color: red; text-align: center; font-family:Arial, Helvetica, sans-serif">{mensajeUsuario}</h2>
    {/if}

    <Table striped>
        <thead>
          <tr>
            <th style="text-decoration: underline;">Provincia:</th>
            <th style="text-decoration: underline;">Mes:</th>
            <th style="text-decoration: underline;">imigrantes:</th>
            <th style="text-decoration: underline;">emigrantes:</th>
            <th style="text-decoration: underline;">total:</th>
          </tr>
        </thead>
        <tbody>
            <tr>
                <td>{updateVariationsProvince}</td>
                <td>{updateVariationsMonth}</td>
                <td><input bind:value={updateVariationsImmigrant}></td>
                <td><input bind:value={updateVariationsEmigrant}></td>
                <td><input bind:value={updateVariationsTotal}></td>
                <td><Button color="primary" on:click={updateVariations}>Actualizar</Button></td>
            </tr>
        </tbody>
    </Table>

    <div style="justify-content: center; display:flex;">
        <Button color="secondary" href= "/residential-variations-stats">Atrás</Button>
    </div>

    

