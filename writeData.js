function ReadFiles()
{
  var fso, f1, ts, s;
    
  var ForReading = 1;
  fso = new ActiveXObject("Scripting.FileSystemObject");
  f1 = fso.CreateTextFile("testfile.txt", true);
    
    
  // Write a line.
//  Response.Write("Writing file <br>");
  f1.WriteLine("Hello World");
  f1.WriteBlankLines(1);
  f1.Close();
    
//  // Read the contents of the file.
//  Response.Write("Reading file <br>");
//  ts = fso.OpenTextFile("c:\\testfile.txt", ForReading);
//  s = ts.ReadLine();
//  Response.Write("File contents = '" + s + "'");
//  ts.Close();
}