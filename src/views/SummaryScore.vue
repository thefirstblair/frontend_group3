<template>
   <v-container fill-height>
          <v-row align="center" class="white--text" justify="center">
            <v-col class="white--text text-center" cols="12" tag="h1">
             <span class="font-weight-black" style="font-size:500%">
               Finish! <br />
               
            </span>

            <br />

            <span class="font-weight-black" style="font-size:250%">
               Score: <br />
               
            </span>
            
              <span class="font-weight-light" style="font-size: 100%">
                Your summary
              </span>


            </v-col>
          </v-row>

      <div class="text-center" justify-center>
               
          <v-progress-circular  :value="20" :size="100" :width="15" color="indigo darken-2">Raw<br/> WPM</v-progress-circular>
          <v-progress-circular :value="40" :size="100" :width="15" color="lime">Adjust <br/>WPM</v-progress-circular>
          <v-progress-circular :value="60" :size="100" :width="15" color="pink">Errors</v-progress-circular>
    
        </div>
        
        <br/>
      <v-row>
          <v-layout justify-center>
          <v-card-actions>

          <v-btn class="ma-2" x-large to=/ >
              <v-icon left x>
                mdi-arrow-left
              </v-icon>Back
            </v-btn>

            <v-btn class="ma-2" x-large to=/typing>
              <v-icon left x>
                mdi-refresh
              </v-icon>
            </v-btn>


          </v-card-actions>
          </v-layout>
      </v-row>

  


     
    </v-container>
 



</template>

<script>
export default {};
</script>

<style>
.v-progress-circular {
  margin: 1rem;
}

.text-center {
  margin-left: auto;
  margin-right: auto;
  width: 50%;
}
</style>