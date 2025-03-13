<script>
  // Initialize Supabase
  const supabaseUrl = 'https://wjhelltvpemzogcleebw.supabase.co'; // Replace with your Supabase URL
  const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndqaGVsbHR2cGVtem9nY2xlZWJ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE4MDQ1MDYsImV4cCI6MjA1NzM4MDUwNn0.QWMoFsaornGG_VqMUWDBob4MFDPuFBZ18T1GgqeVZbQ'; // Replace with your Supabase anon key
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
