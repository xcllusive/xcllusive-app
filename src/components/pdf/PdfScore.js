import React, { Component } from 'react'
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/core'
import ReactPDF from '@react-pdf/node'

class PdfScore extends Component {
  render () {
    return (
      <Document
        author="Luke Skywalker"
        keywords="awesome, resume, start wars"
        subject="The resume of Luke Skywalker"
        title="Resume"
      >
        <Page size="A4">
          <View style={styles.container}>
            <Text>Teste</Text>
          </View>
        </Page>
      </Document>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    '@media max-width: 400': {
      flexDirection: 'column'
    }
  }
})

ReactPDF.render(<PdfScore />)

export default PdfScore
