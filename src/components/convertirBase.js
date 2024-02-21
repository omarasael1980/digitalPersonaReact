function base64c(baseurl){

    // convertir la baseurl a base64
     // Reemplazar los caracteres especiales Base64url con los caracteres Base64 estándar
     let base64 = baseurl.replace(/-/g, '+').replace(/_/g, '/');

     // Añadir el caracter de relleno '=' si es necesario
     const padLength = 4 - (base64.length % 4);
     for (let i = 0; i < padLength; i++) {
         base64 += '=';
     }
 
     return base64;

}

let steven =  "AOhLAcgp43NcwEE381aK6+hcZ2bURXQt2OtSKJ/YNn2PeBPnJ925G6wjFbxXRE/Gs66z7Pk+Ziby6tm7FZK056FT1TkHsSDfvpoEKJT9FtjyauMJaVs3moM7BK9NUTXAGazLafA3fwAJVDX6QXyZPFBMt94FckRsqGxnkGqAaqbwXOlnHJ6xwCmCcMynOrqhSWwrBy5ySY0NqGfmy8LWJ5/7/HsqV47R5CpxhS3k7srNyU6RfcpshFVV5C9vhol5mgKv8T9lklcHbjf68csh6gHvg5D6AjwJi9AYtT3ixwACSurJvP0kIPirP+sktJ1OM8SnRVqQEVXE7lZPvUAoZt9E9rgOEdR5h14l9vE2s+dzbHDMEN+GlQF9/txzhGFgj6g0R6CWEdc5dhafsldj71K5uPfQCqYP2SFSXHF6T9L+GRIHfFXT77OK0CpkeKFv"
console.log(base64c(steven));
    
