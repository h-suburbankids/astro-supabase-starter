<script>
  // Initialize Supabase
  const supabaseUrl = 'https://xyzcompany.supabase.co'; // Replace with your Supabase URL
  const supabaseKey = 'your_supabase_anon_key'; // Replace with your Supabase anon key
  const supabase = supabase.createClient(supabaseUrl, supabaseKey);

  // File upload functionality
  document.getElementById('upload-btn').addEventListener('click', () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'application/pdf'; // Only allow PDFs

    fileInput.onchange = async (e) => {
      const file = e.target.files[0];
      const fileName = `${Date.now()}_${file.name}`;

      try {
        // Upload file to Supabase Storage
        const { data, error } = await supabase.storage
          .from('pdf-files') // Ensure the bucket name matches
          .upload(fileName, file, {
            cacheControl: '3600',
            upsert: false,
          });

        if (error) {
          console.error('Error uploading file:', error);
        } else {
          console.log('File uploaded successfully!', data);
        }
      } catch (error) {
        console.error('Error uploading PDF:', error);
      }
    };

    fileInput.click(); // Trigger file selection
  });
</script>
