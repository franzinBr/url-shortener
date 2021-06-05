export default function getNumberOfPages(total, numberItensPerPage) 
{
    return Math.ceil(total/numberItensPerPage)
}