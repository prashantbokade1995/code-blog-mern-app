import React, { useState, useEffect } from 'react'
import { Stack } from '@mui/system'
import { Button, Paper, TextField } from '@mui/material'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import ReactMarkdown from "react-markdown";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import rehypeRaw from "rehype-raw";


const BlogForm = ({ onSubmit, data = {} }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [markdown, setMarkdown] = useState("");
  const [formError, setFormError] = useState(false);
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);


  useEffect(() => {
    const { title, description, markdown } = data;
    if (!title || !description || !markdown) {
      return;
    }
    title && setTitle(title);
    description && setDescription(description);
    markdown && setMarkdown(markdown);
  }, [data]);


  const handleSubmit = () => {
    // console.log(title, description,markdown);
    const data = {
      title,
      description,
      markdown
    };

    if (!title || !description || !markdown) {
      setFormError(true);
      return;
    };

    setFormError(false);
    onSubmit && onSubmit(data);
  };


  return (
    <>
      <Stack spacing={ 4 }>
        <TextField fullWidth label=" Title" variant='outlined' value={ title } onChange={ (e) => setTitle(e.target.value) } error={ formError && !title } helperText={ formError && !title && "Title is Required" } />
        <TextField multiline rows={ 3 } fullWidth label=" Description" variant='outlined' value={ description } onChange={ (e) => setDescription(e.target.value) } error={ formError && !description } helperText={ formError && !title && "Description is Required" } />


        <Box sx={ { borderBottom: 1, borderColor: 'divider' } }>
          <Tabs value={ selectedTabIndex } onChange={ (_, newIndex) => setSelectedTabIndex(newIndex) } aria-label="basic tabs example">
            <Tab label="Edit" />
            <Tab label="Preview" />
          </Tabs>
        </Box>

        <div hidden={ selectedTabIndex !== 0 }>
          <TextField multiline rows={ 20 } fullWidth label="Markdown" variant='outlined' value={ markdown } onChange={ (e) => setMarkdown(e.target.value) } error={ formError && !markdown } helperText={ formError && !title && "Markdown is Required" } />
        </div>

        <div hidden={ selectedTabIndex !== 1 }>
          <Paper variant='outlined' style={ { padding: 12, overflow: "auto" } }>
            <ReactMarkdown rehypePlugins={ [rehypeRaw] }
              components={ {
                code({
                  node,
                  inline,
                  className,
                  children,
                  ...props
                }) {
                  const match = /language-(\w+)/.exec(
                    className || ""
                  );
                  return !inline && match ? (
                    <SyntaxHighlighter
                      children={ String(children).replace(
                        /\n$/,
                        ""
                      ) }
                      style={ docco }
                      language={ match[1] }
                      PreTag="div"
                      { ...props }
                    />
                  ) : (
                    <code className={ className } { ...props }>
                      { children }
                    </code>
                  );
                },
              } }

            >{ markdown }</ReactMarkdown>
          </Paper>
        </div>
        <Button variant='outlined' onClick={ handleSubmit }>Submit</Button>
      </Stack>
    </>
  )
}

export default BlogForm
