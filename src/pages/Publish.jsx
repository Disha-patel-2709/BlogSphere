
import { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/context/ThemeProvider";
import { useNavigate } from "react-router-dom";
import FileUpload from "@/components/Fileupload/FileUpload";

function Publish() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "",
    thumbnail: null,
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [error, setError] = useState("");

  const handleFileSelect = (file) => {
    setSelectedFile(file);
    setFormData(prev => ({ ...prev, thumbnail: file }));
    
    // Create a preview URL for the image
    const reader = new FileReader();
    reader.onloadend = () => {
      setThumbnailPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCategoryChange = (value) => {
    setFormData(prev => ({
      ...prev,
      category: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.title || !formData.excerpt || !formData.content || !formData.category || !thumbnailPreview) {
      setError("Please fill in all fields and upload a thumbnail");
      return;
    }
    
    // Get existing publications from localStorage or initialize empty array
    const existingPublications = JSON.parse(localStorage.getItem("publications")) || [];
    
    // Create new publication object
    const newPublication = {
      id: Date.now().toString(),
      title: formData.title,
      content: formData.content,
      excerpt: formData.excerpt,
      categories: [formData.category],
      image: thumbnailPreview,
      date: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    };
    
    // Add new publication to array
    const updatedPublications = [newPublication, ...existingPublications];
    
    // Save to localStorage
    localStorage.setItem("publications", JSON.stringify(updatedPublications));
    
    // Reset form
    setFormData({
      title: "",
      excerpt: "",
      content: "",
      category: "",
      thumbnail: null
    });
    setSelectedFile(null);
    setThumbnailPreview(null);
    
    // Navigate to publications page
    navigate("/publication");
  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center p-4 ${
        isDark ? "bg-black" : "bg-[#ffffff]"
      }`}
    >
      <div className="w-6/12 max-w-[1500px] p-6">
        <form onSubmit={handleSubmit}>
          <label className="block text-md font-normal mb-2">
            Select Thumbnail
          </label>

          <FileUpload
            title="Click to upload"
            subtitle="or drag and drop"
            maxSize={2}
            acceptedFileTypes={[
              "image/svg+xml",
              "image/png",
              "image/jpeg",
              "image/gif",
            ]}
            onFileSelect={handleFileSelect}
          />

          <p className="text-sm text-gray-400 mt-4">
            Select a thumbnail for the publication (MAX 2MB)
          </p>

          <div className="mt-8">
            <label className="block text-sm font-normal mb-2">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Heading"
              className={`w-full flex h-10 rounded-md border border-input bg-transparent text-lg shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring px-4 py-2 ${
                isDark
                  ? "text-white border-gray-600"
                  : "text-black border-gray-400"
              }`}
            />
            <p className="text-sm text-gray-400 mt-1">
              This will be the title of the publication
            </p>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-normal mb-2">Excerpt</label>
            <input
              type="text"
              name="excerpt"
              value={formData.excerpt}
              onChange={handleInputChange}
              placeholder="This publication highlights some XYZ topic."
              className={`w-full flex h-10 rounded-md border border-input bg-transparent text-lg shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring px-4 py-2 ${
                isDark
                  ? "text-white border-gray-600"
                  : "text-black border-gray-400"
              }`}
            />

            <p className="text-sm text-gray-400 mt-1">
              This is your short description text
            </p>
          </div>

          <div className="mt-8">
            <label className="block text-sm font-normal mb-2">
              Publication content
            </label>

            <textarea
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              placeholder="Type your content here..."
              className={`w-full flex h-[120px] rounded-md border border-input bg-transparent text-lg shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring px-4 py-2 ${
                isDark
                  ? "text-white border-gray-600"
                  : "text-black border-gray-400"
              }`}
            />
            <p className="text-sm text-gray-400 mt-1">
              (type / to begin writing && drag(up/down) if you want to reorder the things)
            </p>
          </div>
          
          <div className="mt-8">
            <label className="block text-sm font-normal mb-2">
              Select Categories
            </label>
            <Select onValueChange={handleCategoryChange} value={formData.category}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Deep Learning">Deep Learning</SelectItem>
                <SelectItem value="AI">AI</SelectItem>
                <SelectItem value="ML">ML</SelectItem>
                <SelectItem value="Security">Security</SelectItem>
                <SelectItem value="Finance">Finance</SelectItem>
                <SelectItem value="Web">Web</SelectItem>
                <SelectItem value="Backend">Backend</SelectItem>
                <SelectItem value="Frontend">Frontend</SelectItem>
                <SelectItem value="Marketing">Marketing</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {error && (
            <p className="mt-4 text-red-500 text-sm">{error}</p>
          )}
          
          <div className="mt-8 mb-6">
            <Button type="submit" className="w-full">Submit</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Publish;