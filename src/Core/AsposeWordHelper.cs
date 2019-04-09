using Aspose.Words;
using Aspose.Words.Drawing;
using Aspose.Words.Tables;
using System;
using System.Collections.Generic;
using System.Data;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using System.Web;

namespace Boanda.DevelopmentFramework.Web
{
    public class AsposeWordHelper
    {
        /// <summary>
        /// 将DataTable表格对象中数据输出到Aspose.Word的表格对象中
        /// </summary>
        /// <param name="doc">Aspose.Word的document</param>
        /// <param name="docTable">Aspose.Word表格对象</param>
        /// <param name="source">源数据表格对象</param>
        /// <param name="startRow">开始行，不能小于1</param>
        /// <param name="startCol">开始列，默认为0</param>
        public static void FillDataToTable(Document doc, Table docTable, DataTable source, int startRow = 1, int startCol = 0)
        {
            var count = source.Rows.Count;
            if (startRow < 1) throw new ArgumentException("startRow不能小于1");
            if (count > 0)
            {
                for (var i = 0; i < count - 1; i++)
                {
                    var roww = docTable.Rows[startRow];
                    var row = roww.Clone(true);//复制
                    docTable.Rows.Insert(startRow + i, row);//将复制的行插入当前行的上方
                }

                for (var i =1; i <=count; i++)
                {
                    var row = docTable.Rows[startRow+i-1];
                    for (var j = 0; j < source.Columns.Count; j++)
                    {
                        var cell = row.Cells[j + startCol];
                        Aspose.Words.Paragraph p = cell.FirstParagraph;
                        p.AppendChild(new Run(doc, source.Rows[i - 1][j] + string.Empty));
                        cell.FirstParagraph.Remove();
                        cell.AppendChild(p);
                    }
                }
            }
        }

        public static void SetCellValue(Document doc, Cell cell, string val)
        {
            Aspose.Words.Paragraph p = cell.FirstParagraph;
            p.RemoveAllChildren();
            p.AppendChild(new Run(doc, val));
            //cell.AppendChild(p);
        }
             

        /// <summary>
        /// 填充DataTable数据到Word表格
        /// </summary>
        /// <param name="builder">生成Word的builder对象</param>
        /// <param name="source">数据源表格</param>
        /// <param name="tableIdx">表格在节中的索引位置，从0开始</param>
        /// <param name="section">表格所在的节索引，从0开始</param>
        /// <param name="startRow">表格数据开始行，部分合并表头可能从2开始</param>
        public static void FillDataToTable(DocumentBuilder builder, DataTable source, int tableIdx, int section = 0, int startRow = 1, int startCol = 0)
        {
            var count = source.Rows.Count;
            builder.MoveToSection(section);
            if (count > 0 && builder.CurrentStory.Tables.Count > tableIdx)
            {
                var docTable = builder.CurrentStory.Tables[tableIdx];
                FillDataToTable(builder.Document, docTable, source, startRow, startCol);
            }
        }


        public static void MergeCells(Cell startCell, Cell endCell)
        {
            Table parentTable = startCell.ParentRow.ParentTable;
            Point startCellPos = new Point(startCell.ParentRow.IndexOf(startCell), parentTable.IndexOf(startCell.ParentRow));
            Point endCellPos = new Point(endCell.ParentRow.IndexOf(endCell), parentTable.IndexOf(endCell.ParentRow));
            Rectangle mergeRange = new Rectangle(Math.Min(startCellPos.X, endCellPos.X), Math.Min(startCellPos.Y, endCellPos.Y), Math.Abs(endCellPos.X - startCellPos.X) + 1, Math.Abs(endCellPos.Y - startCellPos.Y) + 1);
            foreach (Row row in parentTable.Rows)
            {
                foreach (Cell cell in row.Cells)
                {
                    Point currentPos = new Point(row.IndexOf(cell), parentTable.IndexOf(row));
                    if (mergeRange.Contains(currentPos))
                    {
                        if (currentPos.X == mergeRange.X)
                            cell.CellFormat.HorizontalMerge = CellMerge.First;
                        else
                            cell.CellFormat.HorizontalMerge = CellMerge.Previous;

                        if (currentPos.Y == mergeRange.Y)
                            cell.CellFormat.VerticalMerge = CellMerge.First;
                        else
                            cell.CellFormat.VerticalMerge = CellMerge.Previous;
                    }
                }
            }
        }
    }

    /// <summary>
    ///  压缩图片类
    /// </summary>
    public class Resampler
    {
        /// <summary>
        /// Resamples all images in the document that are greater than the specified PPI (pixels per inch) to the specified PPI
        /// And converts them to JPEG with the specified quality setting.
        /// </summary>
        /// <param name="doc">The document to process.</param>
        /// <param name="desiredPpi">Desired pixels per inch. 220 high quality. 150 screen quality. 96 email quality.</param>
        /// <param name="jpegQuality">0 - 100% JPEG quality.</param>
        /// <returns></returns>
        public static int Resample(Document doc, int desiredPpi = 150, int jpegQuality = 90)
        {
            int count = 0;

            // Convert VML shapes.
            foreach (Shape shape in doc.GetChildNodes(NodeType.Shape, true))
            {
                // It is important to use this method to correctly get the picture shape size in points even if the picture is inside a group shape.
                SizeF shapeSizeInPoints = shape.SizeInPoints;

                if (ResampleCore(shape.ImageData, shapeSizeInPoints, desiredPpi, jpegQuality))
                    count++;
            }

            return count;
        }

        /// <summary>
        /// Resamples one VML or DrawingML image
        /// </summary>
        private static bool ResampleCore(ImageData imageData, SizeF shapeSizeInPoints, int ppi, int jpegQuality)
        {
            // The are actually several shape types that can have an image (picture, ole object, ole control), let's skip other shapes.
            if (imageData == null)
                return false;

            // An image can be stored in the shape or linked from somewhere else. Let's skip images that do not store bytes in the shape.
            byte[] originalBytes = imageData.ImageBytes;
            if (originalBytes == null)
                return false;

            // Ignore metafiles, they are vector drawings and we don't want to resample them.
            ImageType imageType = imageData.ImageType;
            if (imageType.Equals(ImageType.Wmf) || imageType.Equals(ImageType.Emf))
                return false;

            try
            {
                double shapeWidthInches = ConvertUtil.PointToInch(shapeSizeInPoints.Width);
                double shapeHeightInches = ConvertUtil.PointToInch(shapeSizeInPoints.Height);

                // Calculate the current PPI of the image.
                ImageSize imageSize = imageData.ImageSize;
                double currentPpiX = imageSize.WidthPixels / shapeWidthInches;
                double currentPpiY = imageSize.HeightPixels / shapeHeightInches;

                Console.Write("Image PpiX:{0}, PpiY:{1}. ", (int)currentPpiX, (int)currentPpiY);

                // Let's resample only if the current PPI is higher than the requested PPI (e.g. we have extra data we can get rid of).
                if ((currentPpiX <= ppi) || (currentPpiY <= ppi))
                {
                    Console.WriteLine("Skipping.");
                    return false;
                }

                using (Image srcImage = imageData.ToImage())
                {
                    // Create a new image of such size that it will hold only the pixels required by the desired ppi.
                    int dstWidthPixels = (int)(shapeWidthInches * ppi);
                    int dstHeightPixels = (int)(shapeHeightInches * ppi);
                    using (Bitmap dstImage = new Bitmap(dstWidthPixels, dstHeightPixels))
                    {
                        // Drawing the source image to the new image scales it to the new size.
                        using (Graphics gr = Graphics.FromImage(dstImage))
                        {
                            gr.InterpolationMode = InterpolationMode.HighQualityBicubic;
                            gr.DrawImage(srcImage, 0, 0, dstWidthPixels, dstHeightPixels);
                        }

                        // Create JPEG encoder parameters with the quality setting.
                        ImageCodecInfo encoderInfo = GetEncoderInfo(ImageFormat.Jpeg);
                        EncoderParameters encoderParams = new EncoderParameters();
                        encoderParams.Param[0] = new EncoderParameter(Encoder.Quality, jpegQuality);

                        // Save the image as JPEG to a memory stream.
                        MemoryStream dstStream = new MemoryStream();
                        dstImage.Save(dstStream, encoderInfo, encoderParams);

                        // If the image saved as JPEG is smaller than the original, store it in the shape.
                        Console.WriteLine("Original size {0}, new size {1}.", originalBytes.Length, dstStream.Length);
                        if (dstStream.Length < originalBytes.Length)
                        {
                            dstStream.Position = 0;
                            imageData.SetImage(dstStream);
                            return true;
                        }
                    }
                }
            }
            catch (Exception e)
            {
                // Catch an exception, log an error and continue if cannot process one of the images for whatever reason.
                Console.WriteLine("Error processing an image, ignoring. " + e.Message);
            }

            return false;
        }

        /// <summary>
        /// Gets the codec info for the specified image format. Throws if cannot find.
        /// </summary>
        private static ImageCodecInfo GetEncoderInfo(ImageFormat format)
        {
            ImageCodecInfo[] encoders = ImageCodecInfo.GetImageEncoders();

            for (int i = 0; i < encoders.Length; i++)
            {
                if (encoders[i].FormatID == format.Guid)
                    return encoders[i];
            }

            throw new Exception("Cannot find a codec.");
        }
    }
}